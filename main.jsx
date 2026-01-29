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
    let base = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
    let variants = {
        default: "bg-primary-600 text-white hover:bg-primary-500 shadow active:scale-95 transition-all duration-200",
        outline: "border border-slate-700 bg-transparent hover:bg-slate-800 text-primary-400",
        ghost: "hover:bg-slate-800 hover:text-primary-400",
        secondary: "bg-slate-800 text-slate-50 hover:bg-slate-700"
    };
    let sizes = {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8",
        icon: "h-9 w-9",
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
        const finalUrl = baseUrl.includes('?') ? `${baseUrl}&rel=0&modestbranding=1` : `${baseUrl}?rel=0&modestbranding=1`;
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
const THEMES = {
    cyan: {
        name: 'Neon Cyan',
        primary: '6 182 212', // Cyan 500
        vars: {
            '--primary': '6 182 212',
            '--primary-50': '236 254 255',
            '--primary-100': '207 250 254',
            '--primary-200': '165 243 252',
            '--primary-300': '103 232 249',
            '--primary-400': '34 211 238',
            '--primary-500': '6 182 212',
            '--primary-600': '8 145 178',
            '--primary-700': '14 116 144',
            '--primary-800': '21 94 117',
            '--primary-900': '22 78 99',
        }
    },
    orange: {
        name: 'Inferno Orange',
        primary: '249 115 22', // Orange 500
        vars: {
            '--primary': '249 115 22',
            '--primary-50': '255 247 237',
            '--primary-100': '255 237 213',
            '--primary-200': '254 215 170',
            '--primary-300': '253 186 116',
            '--primary-400': '251 146 60',
            '--primary-500': '249 115 22',
            '--primary-600': '234 88 12',
            '--primary-700': '194 65 12',
            '--primary-800': '154 52 18',
            '--primary-900': '124 45 18',
        }
    },
    purple: {
        name: 'Galaxy Purple',
        primary: '168 85 247', // Purple 500
        vars: {
            '--primary': '168 85 247',
            '--primary-50': '250 245 255',
            '--primary-100': '243 232 255',
            '--primary-200': '233 213 255',
            '--primary-300': '216 180 254',
            '--primary-400': '192 132 252',
            '--primary-500': '168 85 247',
            '--primary-600': '147 51 234',
            '--primary-700': '126 34 206',
            '--primary-800': '107 33 168',
            '--primary-900': '88 28 135',
        }
    }
};

// --- Application Settings ---
const GymRoutineApp = () => {
    // 1. Data States
    const [theme, setTheme] = useState(() => localStorage.getItem('gym_theme') || 'cyan');
    const [activeTab, setActiveTab] = useState('routine');
    const [exercisesDb, setExercisesDb] = useState({});
    const [weights, setWeights] = useState({});
    const [completedToday, setCompletedToday] = useState({});

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
            todayConfig.muscles.forEach(muscle => {
                const candidates = exercisesDb[muscle] || [];
                if (candidates.length === 0) return;

                // Weighted logic similar to original
                let pool = [...candidates];
                // Select 2 exercises per muscle
                for (let i = 0; i < 2; i++) {
                    if (pool.length === 0) break;
                    const weightedPool = pool.map(ex => ({ ex, prob: 1 / ((weights[ex.name] || 0) + 1) }));
                    const totalWeight = weightedPool.reduce((sum, item) => sum + item.prob, 0);
                    let r = Math.random() * totalWeight;
                    let winner = weightedPool[0].ex;
                    for (const item of weightedPool) {
                        r -= item.prob;
                        if (r <= 0) { winner = item.ex; break; }
                    }
                    newRoutine.push({ ...winner, muscle, id: `${muscle}-${i}-${Date.now()}` });
                    pool = pool.filter(x => x.name !== winner.name);
                }
            });
            setDailyRoutine(newRoutine);
            setIsSpinning(false);
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
        <div className="space-y-4 pb-24 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-bold text-white">Rutina</h2>
                    <p className="text-slate-400 capitalize">{currentDayName} • {todayConfig.isRest ? 'Descanso' : 'Entrenamiento'}</p>
                </div>
            </div>

            {todayConfig.isRest ? (
                <div className="flex flex-col items-center justify-center p-10 mt-10 text-center border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/50">
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                        <Icon name="Moon" className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-400">¡Día de Descanso!</h3>
                    <p className="text-slate-500 mt-2">La recuperación es clave para el progreso.</p>
                </div>
            ) : dailyRoutine.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-slate-500">No hay rutina generada aún.</p>
                    <Button onClick={generateRoutine} className="mt-4">Generar Ahora</Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Muscle Chips Summary */}
                    <div className="flex flex-wrap gap-2">
                        {todayConfig.muscles.map(m => (
                            <span key={m} className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
                                {m}
                            </span>
                        ))}
                    </div>

                    {/* Exercise List */}
                    {isSpinning ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary-500 blur-2xl opacity-20 animate-pulse"></div>
                                <Icon name="RefreshCw" className="w-16 h-16 text-primary-500 animate-spin-slow" />
                            </div>
                            <p className="text-primary-400 font-mono tracking-widest animate-pulse">GENERANDO...</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {dailyRoutine.map((ex, idx) => (
                                <div key={ex.id} className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-xl group">
                                    {/* Glassy Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                    <div className="p-4 flex gap-4">
                                        <div className="flex-1 space-y-3 pb-2">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className={`text-lg font-bold leading-tight ${completedToday[ex.id] ? 'text-emerald-400 line-through decoration-emerald-500/50' : 'text-slate-100'}`}>
                                                        {ex.name}
                                                    </h3>
                                                    <p className="text-xs text-primary-400 font-bold uppercase tracking-wide mt-1">{ex.muscle}</p>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const isDone = completedToday[ex.id];
                                                        setCompletedToday(prev => {
                                                            const n = { ...prev };
                                                            if (isDone) delete n[ex.id]; else n[ex.id] = true;
                                                            return n;
                                                        });

                                                        // Update stats
                                                        setCompletionStats(prev => ({
                                                            ...prev,
                                                            [ex.name]: Math.max(0, (prev[ex.name] || 0) + (isDone ? -1 : 1))
                                                        }));

                                                        // Update weights (probability)
                                                        const cw = weights[ex.name] || 0;
                                                        setWeights({ ...weights, [ex.name]: isDone ? Math.max(0, cw - 1) : cw + 1 });
                                                    }}
                                                    className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center border transition-all duration-300 ${completedToday[ex.id] ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'border-slate-600 text-slate-500 hover:border-primary-500 hover:text-primary-500 hover:bg-slate-800'}`}
                                                >
                                                    {completedToday[ex.id] ? <Icon name="Check" className="w-5 h-5" /> : <div className="w-3 h-3 rounded-sm bg-current opacity-50" />}
                                                </button>
                                            </div>

                                            {/* Media */}
                                            <div className="w-full h-48 rounded-xl bg-slate-950 overflow-hidden border border-slate-800 relative z-10 shadow-inner">
                                                <ExerciseImage name={ex.name} gif={ex.gif} videoId={ex.videoId} />
                                            </div>


                                            <p className="text-[10px] text-slate-500 text-center font-medium opacity-60">
                                                Veces realizadas este ejercicio: {completionStats[ex.name] || 0}
                                            </p>


                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    const SetupView = () => (
        <div className="space-y-4 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Configuración</h2>
                <p className="text-slate-400 text-sm">Organiza tu semana de entrenamiento.</p>
            </div>

            <div className="space-y-3">
                {DAYS_ES.map(day => {
                    const isExpanded = setupExpandedDay === day;
                    const config = settings[day];
                    const isToday = day === currentDayName;

                    return (
                        <div key={day} className={`rounded-xl border transition-all duration-300 overflow-hidden ${isExpanded ? 'bg-slate-900 border-primary-500/50 shadow-[0_0_20px_rgba(var(--primary),0.1)]' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}>
                            {/* Header */}
                            <div
                                className="p-4 flex items-center justify-between cursor-pointer select-none"
                                onClick={() => setSetupExpandedDay(isExpanded ? null : day)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-1 h-8 rounded-full ${isToday ? 'bg-primary-500' : 'bg-slate-700'}`}></div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className={`font-semibold ${isToday ? 'text-primary-400' : 'text-slate-200'}`}>{day}</h3>
                                            {isToday && <span className="text-[10px] bg-primary-500/20 text-primary-300 px-2 rounded-full font-bold">HOY</span>}
                                        </div>
                                        <p className="text-xs text-slate-500">
                                            {config.isRest ? 'Descanso' : `${config.muscles.length} músculos`}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div onClick={e => e.stopPropagation()}>
                                        <Switch
                                            active={config.isRest}
                                            checked={config.isRest}
                                            onCheckedChange={() => toggleRestDay(day)}
                                            className="scale-90"
                                        />
                                    </div>
                                    <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} className="text-slate-500 w-5 h-5" />
                                </div>
                            </div>

                            {/* Body */}
                            {isExpanded && (
                                <div className={`px-4 pb-6 pt-0 animate-in slide-in-from-top-2`}>
                                    <div className="h-px w-full bg-slate-800 mb-4"></div>
                                    {config.isRest ? (
                                        <p className="text-center text-sm text-slate-500 italic py-2">Día de descanso activado.</p>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-2">
                                            {MUSCLE_GROUPS_ES.sort((a, b) => a.localeCompare(b, 'es')).map(m => {
                                                const isSelected = config.muscles.includes(m);
                                                return (
                                                    <div
                                                        key={m}
                                                        onClick={() => toggleMuscle(day, m)}
                                                        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer border transition-all ${isSelected ? 'bg-primary-500/10 border-primary-500/50' : 'bg-slate-950/50 border-slate-800 hover:bg-slate-800'}`}
                                                    >
                                                        <Checkbox checked={isSelected} id={`${day}-${m}`} className="pointer-events-none" />
                                                        <span className={`text-sm ${isSelected ? 'text-primary-200 font-medium' : 'text-slate-400'}`}>{m}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 text-xs text-slate-400 border border-slate-800">
                <p>💡 Los cambios se guardan automáticamente. Ve a la pestaña "Rutina" para generar tu nuevo entrenamiento.</p>
            </div>
        </div>
    );

    const DonationView = () => (
        <div className="flex flex-col items-center justify-start h-[70vh] text-center space-y-6 animate-in zoom-in-95 pt-8 overflow-y-auto w-full">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl shadow-orange-500/20 shrink-0">
                <Icon name="DollarSign" className="w-10 h-10 text-white" />
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Apoya el Proyecto</h2>
                <p className="text-slate-400 max-w-xs mx-auto text-sm">
                    Ayudame a mantener la app gratuita y sin anuncios.
                </p>
            </div>

            <div className="w-full max-w-xs space-y-3 px-4">
                {/* Monthly Subscription */}
                <a
                    href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=5b2245aa678b4ae080e7c2196e634c75"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-4 bg-[#009EE3] hover:bg-[#008ED0] text-white rounded-xl font-bold transition-all shadow-lg hover:scale-[1.02] active:scale-95 text-sm"
                >
                    <Icon name="CreditCard" className="w-5 h-5" />
                    <span className="flex-1 text-left">Aporte Mensual (MP)</span>
                </a>

                {/* One Time Donation */}
                <a
                    href="https://link.mercadopago.com.ar/workoutroulette"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-4 bg-[#009EE3]/10 border border-[#009EE3]/50 text-[#009EE3] hover:bg-[#009EE3]/20 rounded-xl font-bold transition-all active:scale-95 text-sm"
                >
                    <Icon name="CreditCard" className="w-5 h-5" />
                    <span className="flex-1 text-left">Aporte Único (MP)</span>
                </a>

                {/* PayPal */}
                <a
                    href="https://www.paypal.com/donate/?business=KWYW8UDUZL7JG&no_recurring=0&item_name=WORKOUT+ROULETTE&currency_code=USD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-4 bg-[#003087] hover:bg-[#00256A] text-white rounded-xl font-bold transition-all shadow-lg hover:scale-[1.02] active:scale-95 text-sm"
                >
                    <Icon name="Globe" className="w-5 h-5" />
                    <span className="flex-1 text-left">PayPal (Internacional)</span>
                </a>
            </div>

            <p className="text-[10px] text-slate-600 mt-4 leading-relaxed max-w-[200px]">
                Gracias por tu apoyo. ¡Seguí entrenando duro!
            </p>
        </div>
    );

    const AppearanceView = () => (
        <div className="space-y-6 animate-in slide-in-from-right-4">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Apariencia</h2>
                <p className="text-slate-400 text-sm">Personaliza los colores de la interfaz.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {Object.entries(THEMES).map(([key, t]) => (
                    <button
                        key={key}
                        onClick={() => setTheme(key)}
                        className={`relative p-4 rounded-xl border-2 flex items-center justify-between transition-all group overflow-hidden ${theme === key ? 'border-primary-500 bg-slate-900 shadow-lg' : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'}`}
                    >
                        <div className="flex items-center gap-4 z-10">
                            <div className="w-12 h-12 rounded-full shadow-inner" style={{ background: `rgb(${t.primary})` }}></div>
                            <div className="text-left">
                                <h3 className={`font-bold ${theme === key ? 'text-white' : 'text-slate-300'}`}>{t.name}</h3>
                                <p className="text-xs text-slate-500">Tema {key}</p>
                            </div>
                        </div>
                        {theme === key && <div className="z-10 bg-primary-500 text-white p-2 rounded-full"><Icon name="Check" /></div>}

                        {/* Background glow */}
                        {theme === key && <div className="absolute inset-0 bg-primary-500/10" />}
                    </button>
                ))}
            </div>
        </div>
    );

    // 4. Render Layout
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-primary-500/30">
            {/* Top Bar - Mobile Only essentially */}
            <header className="fixed top-0 inset-x-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-900/50 px-6 h-16 flex items-center justify-center">
                <h1 className="text-xl font-bold tracking-tight">
                    <span className="text-white">WORKOUT</span> <span className="text-primary-500">ROULETTE</span>
                </h1>
            </header>

            {/* Main Content Area */}
            <main className="pt-20 pb-32 px-4 w-full md:max-w-4xl mx-auto min-h-screen">
                {activeTab === 'routine' && <RoutineView />}
                {activeTab === 'setup' && <SetupView />}
                {activeTab === 'appearance' && <AppearanceView />}
                {activeTab === 'donations' && <DonationView />}
                {activeTab === 'settings' && (
                    <div className="text-center py-20 text-slate-500">
                        <Icon name="Settings2" className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Configuraciones generales (próximamente)</p>
                        <Button variant="outline" className="mt-8 text-red-400 hover:text-red-300 border-red-900/30 hover:bg-red-950/30" onClick={() => { if (confirm('¿Borrar todos los datos?')) { localStorage.clear(); window.location.reload(); } }}>
                            Borrar Datos Locales
                        </Button>
                    </div>
                )}
            </main>

            {/* Floating Bottom Navigation */}
            <nav className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md z-40">
                <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl flex items-center justify-between px-2 py-2 relative">

                    {/* Items Left */}
                    <button onClick={() => setActiveTab('appearance')} className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${activeTab === 'appearance' ? 'text-primary-400 bg-primary-500/10' : 'text-slate-500 hover:text-slate-300'}`}>
                        <Icon name="Palette" className="w-5 h-5" />
                        <span className="text-[9px] font-bold uppercase">Apariencia</span>
                    </button>

                    <button onClick={() => setActiveTab('routine')} className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${activeTab === 'routine' ? 'text-primary-400 bg-primary-500/10' : 'text-slate-500 hover:text-slate-300'}`}>
                        <Icon name="Calendar" className="w-5 h-5" />
                        <span className="text-[9px] font-bold uppercase">Rutina</span>
                    </button>

                    {/* Center Action Button */}
                    <div className="relative -top-8 mx-2">
                        <div className="absolute inset-0 bg-primary-500 blur-xl opacity-40 rounded-full animate-pulse"></div>
                        <button
                            onClick={activeTab === 'routine' ? generateRoutine : () => setActiveTab('routine')}
                            className="relative w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-transform border-4 border-slate-950"
                        >
                            <Icon name={isSpinning ? "Dice5" : "Dumbbell"} className={`w-8 h-8 ${isSpinning ? 'animate-spin' : ''}`} />
                        </button>
                    </div>

                    {/* Items Right */}
                    <button onClick={() => setActiveTab('setup')} className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${activeTab === 'setup' ? 'text-primary-400 bg-primary-500/10' : 'text-slate-500 hover:text-slate-300'}`}>
                        <Icon name="SlidersHorizontal" className="w-5 h-5" />
                        <span className="text-[9px] font-bold uppercase">Ajustes</span>
                    </button>

                    <button onClick={() => setActiveTab('donations')} className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${activeTab === 'donations' ? 'text-primary-400 bg-primary-500/10' : 'text-slate-500 hover:text-slate-300'}`}>
                        <Icon name="DollarSign" className="w-5 h-5" />
                        <span className="text-[9px] font-bold uppercase">Donar</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<GymRoutineApp />);
