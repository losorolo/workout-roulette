const { useState, useEffect, useMemo, useRef } = React;
const { createRoot } = ReactDOM;

// --- Icons (Lucide) ---
const Icon = ({ name, className = "", ...props }) => {
    const icons = {
        Dumbbell: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="M14.4 14.4 9.6 9.6" /><path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" /><path d="m21.5 21.5-1.4-1.4" /><path d="M3.9 3.9 2.5 2.5" /><path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" /></svg>,
        Calendar: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>,
        Settings2: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" /></svg>,
        RefreshCw: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></svg>,
        CheckCircle2: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>,
        Moon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>,
        Info: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>,
        AlertCircle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>,
        Dice5: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><path d="M16 8h.01" /><path d="M8 8h.01" /><path d="M8 16h.01" /><path d="M16 16h.01" /><path d="M12 12h.01" /></svg>,
        PlayCircle: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>,
        Check: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="M20 6 9 17l-5-5" /></svg>,
        Palette: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.093 0-.679.63-1.219 1.318-1.219 2.074 0 3.75-1.652 3.75-3.75 0-.469-.153-.895-.406-1.246-.067-.09-.152-.164-.234-.234-.055-.047-.137-.09-.223-.113-.88-.235-1.574-.95-1.957-1.785-.383-.836-.316-1.805.184-2.582.496-.77 1.355-1.188 2.277-1.188h.094c.59 0 1.137.227 1.55.61.415.382.645.918.645 1.48v.02c0 5.523-4.477 10-10 10z" /></svg>,
        DollarSign: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
        ChevronDown: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="m6 9 6 6 6-6" /></svg>,
        ChevronUp: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="m18 15-6-6-6 6" /></svg>,
        SlidersHorizontal: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><line x1="21" x2="14" y1="4" y2="4" /><line x1="10" x2="3" y1="4" y2="4" /><line x1="21" x2="12" y1="12" y2="12" /><line x1="8" x2="3" y1="12" y2="12" /><line x1="21" x2="16" y1="20" y2="20" /><line x1="12" x2="3" y1="20" y2="20" /><circle cx="12" cy="4" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="14" cy="20" r="2" /></svg>,
        CreditCard: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>,
        Globe: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
    };
    return icons[name] || null;
};

// --- Helper Components ---
const Button = ({ className = "", variant = "default", size = "default", onClick, children, disabled, ...props }) => {
    let base = "inline-flex items-center justify-center whitespace-nowrap rounded font-bold uppercase tracking-wide text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
    let variants = {
        default: "bg-primary-500 text-black shadow-[16px_16px_16px_rgb(var(--primary)/0.2),-16px_-16px_16px_rgb(var(--primary)/0.4)] hover:shadow-[20px_20px_20px_rgb(var(--primary)/0.3),-20px_-20px_20px_rgb(var(--primary)/0.5)] active:scale-[0.98]",
        outline: "border-2 border-slate-700 bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white hover:border-slate-500",
        ghost: "hover:bg-white/10 hover:text-white text-slate-400",
        secondary: "bg-black-700 text-white hover:bg-black-600 border border-white/5"
    };
    let sizes = {
        default: "h-12 px-6 py-2", // Taller, more substantial
        sm: "h-9 rounded px-3 text-xs",
        lg: "h-14 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
    };
    return (
        <button
            className={`${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

const Switch = ({ id, checked, onCheckedChange, disabled, className = "" }) => (
    <button
        id={id}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onCheckedChange(!checked)}
        className={`peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${checked ? 'bg-primary-500' : 'bg-slate-700'} ${className}`}
    >
        <span className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
);

const Checkbox = ({ id, checked, onCheckedChange, disabled, className = "" }) => (
    <button
        id={id}
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onCheckedChange(!checked)}
        className={`peer h-5 w-5 shrink-0 rounded border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center transition-all ${checked ? 'bg-primary-600 border-primary-600 text-white shadow-[0_0_10px_rgba(var(--primary),0.5)]' : 'border-slate-600 bg-slate-800'} ${className}`}
    >
        {checked && <Icon name="Check" className="h-3.5 w-3.5" />}
    </button>
);

const ExerciseImage = ({ name, gif, videoId }) => {
    const [error, setError] = useState(false);
    if (videoId) {
        const baseUrl = `https://www.youtube.com/embed/${videoId}`;
        const finalUrl = baseUrl.includes('?') ? `${baseUrl}&rel=0&modestbranding=1&mute=1` : `${baseUrl}?rel=0&modestbranding=1&mute=1`;
        return (
            <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center overflow-hidden relative group/video">
                <iframe width="100%" height="100%" src={finalUrl} title={name} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full"></iframe>
            </div>
        );
    }
    if (!error && gif) {
        return (
            <div className="relative w-full h-full group/image">
                <img src={gif} alt={name} className="w-full h-full object-cover opacity-90 transition-opacity" onError={() => setError(true)} />
                <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(name + " exercise technique")}`} target="_blank" rel="noopener noreferrer" className="absolute bottom-2 right-2 bg-black/60 hover:bg-red-600/90 text-white p-1.5 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover/image:opacity-100 scale-90 hover:scale-100" onClick={(e) => e.stopPropagation()}>
                    <Icon name="PlayCircle" className="w-4 h-4" />
                </a>
            </div>
        );
    }
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/50 gap-2 p-2 text-center group/fallback">
            <Icon name="Dumbbell" className="w-6 h-6 text-slate-700 mb-1" />
            <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(name + " exercise technique")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] text-primary-400 hover:text-primary-300 border border-primary-500/30 bg-primary-500/10 px-3 py-1.5 rounded-full transition-all hover:bg-primary-500/20" onClick={(e) => e.stopPropagation()}>
                <span>Ver en YouTube</span>
            </a>
        </div>
    );
};

// --- Constants ---
const DAYS_ES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const MUSCLE_GROUPS_ES = [
    'Abdominales', 'Bíceps', 'Gemelos', 'Pecho', 'Antebrazos', 'Glúteos',
    'Isquiotibiales', 'Dorsales', 'Lumbares', 'Espalda', 'Cuádriceps',
    'Hombros', 'Trapecios', 'Tríceps', 'Aductores', 'Abductores', 'Oblicuos'
];

// --- Theme Config ---
// --- Theme Config ---
const THEMES = {
    // Replaced Cyan with a more "Neon Blue" look to match the dark aesthetic
    cyan: {
        name: 'Electric Blue',
        primary: '0 255 255', // Pure Cyan
        vars: {
            '--primary': '0 255 255',
            '--primary-50': '224 255 255',
            '--primary-100': '179 255 255',
            '--primary-200': '128 255 255',
            '--primary-300': '77 255 255',
            '--primary-400': '26 255 255',
            '--primary-500': '0 255 255', // High Viz
            '--primary-600': '0 204 204',
            '--primary-700': '0 153 153',
            '--primary-800': '0 102 102',
            '--primary-900': '0 51 51',
        }
    },
    // Updated Orange to be the default "Gym Brand" orange from the reference
    orange: {
        name: 'High Voltage Orange',
        primary: '255 87 34', // Deep Orange
        vars: {
            '--primary': '255 87 34',
            '--primary-50': '255 243 224',
            '--primary-100': '255 224 178',
            '--primary-200': '255 204 128',
            '--primary-300': '255 183 77',
            '--primary-400': '255 167 38',
            '--primary-500': '255 87 34', // The reference color
            '--primary-600': '244 81 30',
            '--primary-700': '230 74 25',
            '--primary-800': '216 67 21',
            '--primary-900': '191 54 12',
        }
    },
    // Updated Purple to a Neon Purple
    purple: {
        name: 'Cyber Purple',
        primary: '213 0 249', // Purple A400
        vars: {
            '--primary': '213 0 249',
            '--primary-50': '250 227 254',
            '--primary-100': '243 186 253',
            '--primary-200': '232 128 252',
            '--primary-300': '223 83 250',
            '--primary-400': '213 0 249', // Neon
            '--primary-500': '196 0 231',
            '--primary-600': '170 0 200',
            '--primary-700': '138 0 163',
            '--primary-800': '111 0 131',
            '--primary-900': '74 20 140', // Deep purple
        }
    }
};

// --- Application Settings ---
const GymRoutineApp = () => {
    // 1. Data States
    // Default to 'orange' as it matches the requested style best
    const [theme, setTheme] = useState(() => localStorage.getItem('gym_theme') || 'orange');
    const [activeTab, setActiveTab] = useState('routine');
    const [exercisesDb, setExercisesDb] = useState({});
    const [weights, setWeights] = useState({});
    const [completedToday, setCompletedToday] = useState({});
    const [expandedExercises, setExpandedExercises] = useState({});

    // Config: { [dayName]: { isRest: boolean, muscles: string[] } }
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('gym-routine-settings-es');
        if (saved) return JSON.parse(saved);
        const initial = {};
        DAYS_ES.forEach(day => initial[day] = { isRest: false, muscles: [] });
        return initial;
    });

    // Completion Stats (Total times done)
    const [completionStats, setCompletionStats] = useState(() => {
        const saved = localStorage.getItem('gym_completion_stats');
        return saved ? JSON.parse(saved) : {};
    });

    // Helper: Sort function for Spanish strings
    const sortSpanish = (a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' });


    const [dailyRoutine, setDailyRoutine] = useState([]);
    const [isSpinning, setIsSpinning] = useState(false);

    // Viewing specific days in Setup
    const [setupExpandedDay, setSetupExpandedDay] = useState(null);

    // 2. Effects
    // Apply Theme
    useEffect(() => {
        const themeConfig = THEMES[theme] || THEMES.cyan;
        const root = document.documentElement;
        Object.entries(themeConfig.vars).forEach(([key, val]) => {
            root.style.setProperty(key, val);
        });
        localStorage.setItem('gym_theme', theme);
    }, [theme]);

    // Initialize Data
    useEffect(() => {
        const w = JSON.parse(localStorage.getItem('gym_weights') || '{}');
        setWeights(w);

        fetch('./data/exercises_db.json')
            .then(res => res.json())
            .then(data => setExercisesDb(data))
            .catch(err => console.error("Error loading DB", err));

        // Default expanded day to today
        const today = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
        const dayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);
        setSetupExpandedDay(DAYS_ES.includes(dayCapitalized) ? dayCapitalized : 'Lunes');
    }, []);

    // Save Settings
    useEffect(() => {
        localStorage.setItem('gym-routine-settings-es', JSON.stringify(settings));
    }, [settings]);

    useEffect(() => {
        localStorage.setItem('gym_completion_stats', JSON.stringify(completionStats));
    }, [completionStats]);

    // 3. Logic
    const getToday = () => {
        const d = new Date().getDay();
        return DAYS_ES[d === 0 ? 6 : d - 1]; // Monday is index 0 in our array
    };
    const currentDayName = getToday();
    const todayConfig = settings[currentDayName] || { isRest: false, muscles: [] };

    const generateRoutine = () => {
        if (todayConfig.isRest || todayConfig.muscles.length === 0) {
            setDailyRoutine([]);
            setActiveTab('routine');
            return;
        }

        setIsSpinning(true);
        setActiveTab('routine'); // Switch to routine view to see the spin
        setCompletedToday({});

        setTimeout(() => {
            const newRoutine = [];
            const selectedMuscles = todayConfig.muscles;
            if (selectedMuscles.length === 0) return;

            // Determine total number of exercises for this session (5 to 8)
            const targetTotal = Math.floor(Math.random() * 4) + 5; // 5, 6, 7, or 8

            // Collect all possible candidates
            let totalCandidates = [];
            selectedMuscles.forEach(muscle => {
                const candidates = exercisesDb[muscle] || [];
                candidates.forEach(ex => totalCandidates.push({ ...ex, muscle }));
            });

            if (totalCandidates.length === 0) {
                setIsSpinning(false);
                return;
            }

            // Pick exercises until we reach target or run out of candidates
            let pool = [...totalCandidates];
            while (newRoutine.length < targetTotal && pool.length > 0) {
                // Weighted selection based on weights
                const weightedPool = pool.map(item => ({
                    item,
                    prob: 1 / ((weights[item.name] || 0) + 1)
                }));
                const totalWeight = weightedPool.reduce((sum, p) => sum + p.prob, 0);
                let r = Math.random() * totalWeight;
                let winnerIdx = 0;
                for (let i = 0; i < weightedPool.length; i++) {
                    r -= weightedPool[i].prob;
                    if (r <= 0) {
                        winnerIdx = i;
                        break;
                    }
                }

                const winner = pool[winnerIdx];
                newRoutine.push({ ...winner, id: `${winner.muscle}-${newRoutine.length}-${Date.now()}` });
                pool.splice(winnerIdx, 1);
            }

            setDailyRoutine(newRoutine);
            setIsSpinning(false);
            // Auto expand first exercise
            if (newRoutine.length > 0) {
                setExpandedExercises({ [newRoutine[0].id]: true });
            }
        }, 1500);
    };

    const hasLoaded = useRef(false);
    useEffect(() => {
        if (!hasLoaded.current && Object.keys(exercisesDb).length > 0 && todayConfig.muscles.length > 0) {
            generateRoutine();
            hasLoaded.current = true;
        }
    }, [exercisesDb]); // Run once on load if possible

    const toggleRestDay = (day) => {
        setSettings(prev => ({ ...prev, [day]: { ...prev[day], isRest: !prev[day].isRest } }));
    };

    const toggleMuscle = (day, m) => {
        setSettings(prev => {
            const list = prev[day].muscles;
            const newList = list.includes(m) ? list.filter(x => x !== m) : [...list, m];
            return { ...prev, [day]: { ...prev[day], muscles: newList } };
        });
    };

    // --- View Components ---

    const RoutineView = () => (
        <div className="space-y-6 pb-24 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-end justify-between border-b border-white/10 pb-4">
                <div>
                    <span className="text-primary-500 text-xs font-bold tracking-[0.2em] uppercase mb-1 block">Tu Entrenamiento</span>
                    <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
                        {todayConfig.isRest ? 'Día Libre' : currentDayName}
                    </h2>
                </div>
                {!todayConfig.isRest && dailyRoutine.length > 0 && (
                    <div className="text-right">
                        <p className="text-xs text-slate-400 font-mono">{dailyRoutine.length} EJERCICIOS</p>
                    </div>
                )}
            </div>

            {todayConfig.isRest ? (
                <div className="flex flex-col items-center justify-center p-12 mt-4 text-center border border-dashed border-white/10 rounded-3xl bg-black-800/50">
                    <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-emerald-500/30">
                        <Icon name="Moon" className="w-12 h-12 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase italic">Modo Recuperación</h3>
                    <p className="text-slate-400 mt-2 max-w-xs text-sm">El músculo crece cuando descansas. Tómate el día libre.</p>
                </div>
            ) : dailyRoutine.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                        <Icon name="Dumbbell" className="w-10 h-10 text-slate-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Listo para entrenar?</h3>
                    <p className="text-slate-500 mb-6 max-w-xs">Genera tu rutina del día basada en tu configuración.</p>
                    <Button onClick={generateRoutine} size="lg" className="shadow-xl shadow-primary-500/10">
                        INICIAR RUTINA <Icon name="PlayCircle" className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Muscle Chips Summary - Modern Chips */}
                    <div className="flex flex-wrap gap-2">
                        {todayConfig.muscles.map(m => (
                            <span key={m} className="px-4 py-1.5 rounded bg-black-700 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                                {m}
                            </span>
                        ))}
                    </div>

                    {/* Exercise List */}
                    {isSpinning ? (
                        <div className="flex flex-col items-center justify-center py-24 space-y-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary-500 blur-3xl opacity-20 animate-pulse"></div>
                                <Icon name="RefreshCw" className="w-20 h-20 text-primary-500 animate-spin-slow" strokeWidth={1.5} />
                            </div>
                            <p className="text-white text-lg font-black tracking-[0.3em] uppercase animate-pulse">Seleccionando...</p>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {dailyRoutine.map((ex, idx) => {
                                const isExpanded = expandedExercises[ex.id];
                                return (
                                    <div key={ex.id} className="relative overflow-hidden rounded-xl bg-black-800 border-l-4 border-l-primary-500 border-y border-r border-y-black-700 border-r-black-700 shadow-2xl group transition-all duration-300">
                                        {/* Content */}
                                        <div className="flex flex-col">
                                            {/* Info Section - Clickable to expand */}
                                            <div
                                                className="flex-1 p-5 flex flex-col justify-between relative border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors"
                                                onClick={() => setExpandedExercises(prev => ({ ...prev, [ex.id]: !prev[ex.id] }))}
                                            >
                                                {/* Background number */}
                                                <div className="absolute right-2 top-2 text-6xl font-black text-white/5 select-none pointer-events-none italic">
                                                    {idx + 1}
                                                </div>

                                                <div className="space-y-2 pr-12">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-[10px] font-bold text-primary-500 uppercase tracking-widest">{ex.muscle}</span>
                                                        {isExpanded ? (
                                                            <Icon name="ChevronUp" className="w-3 h-3 text-slate-500" />
                                                        ) : (
                                                            <Icon name="ChevronDown" className="w-3 h-3 text-slate-500" />
                                                        )}
                                                    </div>
                                                    <h3 className={`text-xl font-black uppercase leading-tight ${completedToday[ex.id] ? 'text-emerald-500 decoration-emerald-500/50' : 'text-white'}`}>
                                                        {ex.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                                                        <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">Series: 4</span>
                                                        <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">Reps: 8-12</span>
                                                    </div>
                                                </div>

                                                <div className="mt-6 flex items-center justify-between">
                                                    <div className="text-[10px] text-slate-500 font-mono">
                                                        Historia: {completionStats[ex.name] || 0} completados
                                                    </div>

                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const isDone = completedToday[ex.id];
                                                            setCompletedToday(prev => {
                                                                const n = { ...prev };
                                                                if (isDone) delete n[ex.id]; else n[ex.id] = true;
                                                                return n;
                                                            });
                                                            setCompletionStats(prev => ({
                                                                ...prev,
                                                                [ex.name]: Math.max(0, (prev[ex.name] || 0) + (isDone ? -1 : 1))
                                                            }));
                                                            const cw = weights[ex.name] || 0;
                                                            setWeights({ ...weights, [ex.name]: isDone ? Math.max(0, cw - 1) : cw + 1 });
                                                        }}
                                                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all group/btn ${completedToday[ex.id] ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-white/5 text-white hover:bg-white/10 border-2 border-white/10'}`}
                                                    >
                                                        {completedToday[ex.id] ? (
                                                            <Icon name="Check" className="w-5 h-5 stroke-[4]" />
                                                        ) : (
                                                            <div className="w-4 h-4 border-2 border-slate-500 rounded-sm transition-colors group-hover/btn:border-orange-500 group-hover/btn:bg-orange-500/20" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Video Section - Expandable */}
                                            {isExpanded && (
                                                <div className="w-full h-64 bg-black-900 overflow-hidden relative animate-in slide-in-from-top-2 duration-300">
                                                    <ExerciseImage name={ex.name} gif={ex.gif} videoId={ex.videoId} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    const SetupView = () => (
        <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="mb-4 border-b border-white/10 pb-4">
                <span className="text-primary-500 text-xs font-bold tracking-[0.2em] uppercase mb-1 block">Configuración</span>
                <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">Plan Semanal</h2>
            </div>

            <div className="space-y-4">
                {DAYS_ES.map(day => {
                    const isExpanded = setupExpandedDay === day;
                    const config = settings[day];
                    const isToday = day === currentDayName;

                    return (
                        <div key={day} className={`rounded border transition-all duration-300 overflow-hidden ${isExpanded ? 'bg-black-800 border-primary-500 ring-1 ring-primary-500/50' : 'bg-black-800/50 border-white/5 hover:bg-black-800 hover:border-white/10'}`}>
                            {/* Header */}
                            <div
                                className="p-5 flex items-center justify-between cursor-pointer select-none group"
                                onClick={() => setSetupExpandedDay(isExpanded ? null : day)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-1.5 h-10 rounded-full transition-colors ${isToday ? 'bg-primary-500 shadow-[0_0_15px_rgba(var(--primary),0.6)]' : 'bg-black-600 group-hover:bg-white/20'}`}></div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className={`font-bold text-lg uppercase tracking-wide ${isToday ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>{day}</h3>
                                            {isToday && <span className="text-[9px] bg-primary-500 text-black px-2 py-0.5 rounded font-bold uppercase tracking-widest">Hoy</span>}
                                        </div>
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">
                                            {config.isRest ? 'Descanso' : `${config.muscles.length} Grupos Musculares`}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div onClick={e => e.stopPropagation()} className="flex items-center gap-2">
                                        <span className={`text-[10px] font-bold uppercase ${config.isRest ? 'text-emerald-500' : 'text-slate-600'}`}>Rest</span>
                                        <Switch
                                            active={config.isRest}
                                            checked={config.isRest}
                                            onCheckedChange={() => toggleRestDay(day)}
                                            className="data-[state=checked]:bg-emerald-500"
                                        />
                                    </div>
                                    <div className={`p-1 rounded transition-colors ${isExpanded ? 'bg-white/10 text-white' : 'text-slate-600'}`}>
                                        <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            {/* Body */}
                            {isExpanded && (
                                <div className={`px-5 pb-6 pt-2 animate-in slide-in-from-top-2`}>

                                    {config.isRest ? (
                                        <div className="py-8 text-center border-t border-dashed border-white/10">
                                            <p className="text-sm text-slate-500 uppercase tracking-widest">Día de recuperación asignado</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/5">
                                                {MUSCLE_GROUPS_ES.sort((a, b) => a.localeCompare(b, 'es')).map(m => {
                                                    const isSelected = config.muscles.includes(m);
                                                    return (
                                                        <div
                                                            key={m}
                                                            onClick={() => toggleMuscle(day, m)}
                                                            className={`flex items-center gap-3 p-3 rounded cursor-pointer border transition-all ${isSelected ? 'bg-primary-500/10 border-primary-500/50' : 'bg-black-900 border-white/5 hover:border-white/20'}`}
                                                        >
                                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-primary-500 border-primary-500 text-black' : 'border-slate-600 bg-transparent'}`}>
                                                                {isSelected && <Icon name="Check" className="w-3.5 h-3.5 stroke-[4]" />}
                                                            </div>
                                                            <span className={`text-xs font-bold uppercase tracking-wide ${isSelected ? 'text-primary-100' : 'text-slate-400'}`}>{m}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const DonationView = () => (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in zoom-in-95 w-full">
            <div className="relative">
                <div className="absolute inset-0 bg-primary-500 blur-3xl opacity-20"></div>
                <div className="w-24 h-24 bg-gradient-to-br from-black-800 to-black-900 border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl relative z-10 rotate-3 transform transition-transform hover:rotate-6">
                    <Icon name="DollarSign" className="w-10 h-10 text-primary-500" />
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-3xl font-black uppercase italic tracking-tighter">Donaciones</h2>
                <p className="text-slate-400 max-w-xs mx-auto text-sm font-medium">
                    Ayuda a mantener la app gratuita y sin anuncios.
                </p>
            </div>

            <div className="w-full max-w-xs space-y-4 px-4">
                {/* Monthly Subscription */}
                <a
                    href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=5b2245aa678b4ae080e7c2196e634c75"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 w-full p-4 bg-[#009EE3] hover:bg-[#008ED0] text-white rounded font-bold uppercase tracking-wide transition-all shadow-[0_0_20px_rgba(0,158,227,0.3)] hover:shadow-[0_0_30px_rgba(0,158,227,0.5)] active:scale-[0.98] text-xs"
                >
                    <Icon name="CreditCard" className="w-5 h-5" />
                    <span className="flex-1 text-left">Suscripción Mensual (MP)</span>
                </a>

                {/* One Time Donation */}
                <a
                    href="https://link.mercadopago.com.ar/workoutroulette"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 w-full p-4 bg-transparent border border-[#009EE3] text-[#009EE3] hover:bg-[#009EE3]/10 rounded font-bold uppercase tracking-wide transition-all active:scale-[0.98] text-xs"
                >
                    <Icon name="CreditCard" className="w-5 h-5" />
                    <span className="flex-1 text-left">Aporte Único (MP)</span>
                </a>

                {/* PayPal */}
                <a
                    href="https://www.paypal.com/donate/?business=KWYW8UDUZL7JG&no_recurring=0&item_name=WORKOUT+ROULETTE&currency_code=USD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 w-full p-4 bg-[#003087] hover:bg-[#00256A] text-white rounded font-bold uppercase tracking-wide transition-all shadow-lg active:scale-[0.98] text-xs"
                >
                    <Icon name="Globe" className="w-5 h-5" />
                    <span className="flex-1 text-left">PayPal (Internacional)</span>
                </a>
            </div>

            <p className="text-[10px] text-slate-600 mt-8 font-mono uppercase tracking-widest opacity-50">
                Gracias por tu apoyo.
            </p>
        </div>
    );

    const AppearanceView = () => (
        <div className="space-y-6 animate-in slide-in-from-right-4">
            <div className="mb-4 border-b border-white/10 pb-4">
                <span className="text-primary-500 text-xs font-bold tracking-[0.2em] uppercase mb-1 block">Estilo Visual</span>
                <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">Tema</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {Object.entries(THEMES).map(([key, t]) => (
                    <button
                        key={key}
                        onClick={() => setTheme(key)}
                        className={`relative p-5 rounded border-l-4 transition-all group overflow-hidden text-left ${theme === key ? 'bg-black-800 border-l-primary-500 border-y border-r border-y-black-700 border-r-black-700 shadow-xl' : 'bg-black-800/30 border-l-transparent border-y border-r border-y-transparent border-r-transparent hover:bg-black-800 hover:border-l-slate-600'}`}
                        style={theme === key ? { borderColor: `rgb(${t.primary})` } : {}}
                    >
                        {/* Background glow for active */}
                        {theme === key && <div className="absolute inset-0 bg-primary-500/5 mix-blend-overlay"></div>}

                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded bg-black-950 border border-white/10 flex items-center justify-center">
                                    <div className="w-6 h-6 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: `rgb(${t.primary})`, color: `rgb(${t.primary})` }}></div>
                                </div>
                                <div>
                                    <h3 className={`font-black uppercase italic tracking-wide text-lg ${theme === key ? 'text-white' : 'text-slate-400'}`}>{t.name}</h3>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Skin</p>
                                </div>
                            </div>

                            {theme === key && (
                                <div className="w-8 h-8 rounded-full bg-primary-500 text-black flex items-center justify-center animate-in zoom-in">
                                    <Icon name="Check" className="w-5 h-5 stroke-[3]" />
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-8 p-6 rounded bg-black-800/50 border border-white/5 text-center">
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Más temas próximamente</p>
            </div>
        </div>
    );

    // 4. Render Layout - Modern Redesign
    return (
        <div className="min-h-screen bg-black-900 text-white font-sans selection:bg-primary-500/30 selection:text-black">
            {/* Top Bar - sticky, heavy blur, minimal */}
            <header className="fixed top-0 inset-x-0 z-30 bg-black-900/80 backdrop-blur-xl border-b border-white/5 px-6 h-20 flex items-center justify-between md:justify-center">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-black italic tracking-tighter uppercase leading-none">
                        Workout<span className="text-primary-500">Roulette</span>
                    </h1>
                    <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">Fitness App</span>
                </div>
                {/* Mobile settings toggle shortcut could go here */}
            </header>

            {/* Main Content Area */}
            <main className="pt-24 pb-32 px-4 max-w-md md:max-w-4xl mx-auto min-h-screen">
                {activeTab === 'routine' && <RoutineView />}
                {activeTab === 'setup' && <SetupView />}
                {activeTab === 'appearance' && <AppearanceView />}
                {activeTab === 'donations' && <DonationView />}
                {/* Settings Tab Content */}
                {activeTab === 'settings' && (
                    <div className="text-center py-20 text-slate-500">
                        <Icon name="Settings2" className="w-16 h-16 mx-auto mb-6 opacity-30" />
                        <h2 className="text-2xl font-bold text-white mb-2">Ajustes Generales</h2>
                        <p className="mb-8 max-w-sm mx-auto">Configura tu experiencia de entrenamiento al máximo detalle.</p>

                        <Button variant="outline" className="border-red-500/20 text-red-500 hover:bg-red-500/10 hover:border-red-500/50 w-full max-w-xs" onClick={() => { if (confirm('¿Borrar todos los datos?')) { localStorage.clear(); window.location.reload(); } }}>
                            ⚠️ Borrar Datos Locales
                        </Button>
                    </div>
                )}
            </main>

            {/* Floating Bottom Navigation - Sleek & Dark */}
            <nav className="fixed bottom-0 left-0 right-0 z-40 bg-black-800/90 backdrop-blur-lg border-t border-white/5 pb-safe pt-2">
                <div className="flex items-center justify-around max-w-md mx-auto h-16 px-2 relative">

                    <button onClick={() => setActiveTab('appearance')} className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all group ${activeTab === 'appearance' ? 'text-primary-500' : 'text-slate-500 hover:text-slate-300'}`}>
                        <div className={`p-1.5 rounded-lg transition-all ${activeTab === 'appearance' ? 'bg-primary-500/10' : 'group-hover:bg-white/5'}`}>
                            <Icon name="Palette" className="w-5 h-5" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wide">Estilo</span>
                    </button>

                    <button onClick={() => {
                        setActiveTab('routine');
                        if (dailyRoutine.length === 0) generateRoutine();
                    }} className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all group ${activeTab === 'routine' ? 'text-primary-500' : 'text-slate-500 hover:text-slate-300'}`}>
                        <div className={`p-1.5 rounded-lg transition-all ${activeTab === 'routine' ? 'bg-primary-500/10' : 'group-hover:bg-white/5'}`}>
                            <Icon name="Calendar" className="w-5 h-5" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wide">Rutina</span>
                    </button>

                    {/* Center Action Button - Hexagon/Diamond shape hint or just clean circle */}
                    <div className="relative -top-6 mx-2">
                        <div className="absolute inset-0 bg-primary-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
                        <button
                            onClick={() => {
                                if (activeTab === 'routine') {
                                    generateRoutine();
                                } else {
                                    setActiveTab('routine');
                                    if (dailyRoutine.length === 0) generateRoutine();
                                }
                            }}
                            className="relative w-16 h-16 bg-primary-500 text-black hover:bg-primary-400 active:scale-95 transition-all shadow-xl shadow-primary-500/20 rounded-full flex items-center justify-center border-4 border-black-900 z-10 group"
                        >
                            <Icon name={isSpinning ? "Dice5" : "Dumbbell"} className={`w-8 h-8 ${isSpinning ? 'animate-spin' : 'group-hover:scale-110 transition-transform'}`} strokeWidth={2.5} />
                        </button>
                    </div>

                    <button onClick={() => setActiveTab('setup')} className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all group ${activeTab === 'setup' ? 'text-primary-500' : 'text-slate-500 hover:text-slate-300'}`}>
                        <div className={`p-1.5 rounded-lg transition-all ${activeTab === 'setup' ? 'bg-primary-500/10' : 'group-hover:bg-white/5'}`}>
                            <Icon name="SlidersHorizontal" className="w-5 h-5" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wide">Ajustes</span>
                    </button>

                    <button onClick={() => setActiveTab('donations')} className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all group ${activeTab === 'donations' ? 'text-primary-500' : 'text-slate-500 hover:text-slate-300'}`}>
                        <div className={`p-1.5 rounded-lg transition-all ${activeTab === 'donations' ? 'bg-primary-500/10' : 'group-hover:bg-white/5'}`}>
                            <Icon name="DollarSign" className="w-5 h-5" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wide">Donaciones</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<GymRoutineApp />);
