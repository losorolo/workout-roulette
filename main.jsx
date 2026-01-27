const { useState, useEffect, useMemo, useRef } = React;
const { createRoot } = ReactDOM;

// --- Icons Component (Lucide SVGs) ---
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
        Check: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="M20 6 9 17l-5-5" /></svg>
    };
    return icons[name] || null;
};

// --- UI Components ---
const Card = ({ className = "", children }) => (
    <div className={`rounded-xl border shadow ${className}`}>{children}</div>
);
const CardHeader = ({ className = "", children }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);
const CardTitle = ({ className = "", children }) => (
    <h3 className={`font-semibold tracking-tight ${className}`}>{children}</h3>
);
const CardDescription = ({ className = "", children }) => (
    <p className={`text-sm text-slate-400 ${className}`}>{children}</p>
);
const CardContent = ({ className = "", children }) => (
    <div className={`p-6 pt-0 ${className}`}>{children}</div>
);
const Button = ({ className = "", variant = "default", size = "default", onClick, children, disabled, ...props }) => {
    let base = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
    let variants = {
        default: "bg-cyan-600 text-white hover:bg-cyan-500 shadow",
        outline: "border border-slate-700 bg-transparent hover:bg-slate-800 text-cyan-400",
        ghost: "hover:bg-slate-800 hover:text-cyan-400",
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
const Checkbox = ({ id, checked, onCheckedChange, disabled, className = "" }) => (
    <button
        id={id}
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onCheckedChange(!checked)}
        className={`peer h-4 w-4 shrink-0 rounded-sm border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center ${checked ? 'bg-cyan-600 border-cyan-600 text-white' : 'border-slate-500'} ${className}`}
    >
        {checked && <Icon name="Check" className="h-3 w-3" />}
    </button>
);
const Switch = ({ id, checked, onCheckedChange, disabled, className = "" }) => (
    <button
        id={id}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onCheckedChange(!checked)}
        className={`peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${checked ? 'bg-emerald-500' : 'bg-slate-700'} ${className}`}
    >
        <span className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
);
const Tabs = ({ value, onValueChange, className = "", children }) => {
    const activeTab = value;
    return (
        <div className={className}>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { activeTab, onValueChange });
                }
                return child;
            })}
        </div>
    );
}
const TabsList = ({ className = "", children, activeTab, onValueChange }) => (
    <div className={`inline-flex h-9 items-center justify-center rounded-lg bg-slate-900 p-1 text-slate-500 ${className}`}>
        {React.Children.map(children, child => React.cloneElement(child, { activeTab, onValueChange }))}
    </div>
);
const TabsTrigger = ({ value, activeTab, onValueChange, children, className = "" }) => {
    const isActive = activeTab === value;
    return (
        <button
            onClick={() => onValueChange(value)}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isActive ? 'bg-cyan-600 text-white shadow' : 'hover:bg-slate-800 hover:text-slate-300'} ${className}`}
        >
            {children}
        </button>
    );
};
const TabsContent = ({ value, activeTab, children, className = "" }) => {
    if (value !== activeTab) return null;
    return <div className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}>{children}</div>;
};
const Separator = ({ className = "" }) => <div className={`shrink-0 bg-slate-800 h-[1px] ${className}`} />;

// --- CONSTANTS (Spanish) ---
const DAYS_ES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const MUSCLE_GROUPS_ES = [
    'Abdominales', 'Bíceps', 'Gemelos', 'Pecho', 'Antebrazos', 'Glúteos',
    'Isquiotibiales', 'Dorsales', 'Lumbares', 'Espalda', 'Cuádriceps',
    'Hombros', 'Trapecios', 'Tríceps', 'Aductores', 'Abductores', 'Oblicuos'
];

// --- MAIN APP ---
// --- HELPER COMPONENTS ---
const ExerciseImage = ({ name, gif, videoId }) => {
    const [error, setError] = useState(false);

    // 1. If we have a direct video ID (best experience)
    if (videoId) {
        // Handle start time param if present in ID (hacky but effective)
        // Ensure we don't double '?'
        const baseUrl = `https://www.youtube.com/embed/${videoId}`;
        const finalUrl = baseUrl.includes('?')
            ? `${baseUrl}&rel=0&modestbranding=1`
            : `${baseUrl}?rel=0&modestbranding=1`;

        return (
            <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center overflow-hidden relative group/video">
                <iframe
                    width="100%"
                    height="100%"
                    src={finalUrl}
                    title={name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                ></iframe>
            </div>
        );
    }

    // 2. Fallback to Image (from repo)
    if (!error && gif) {
        return (
            <div className="relative w-full h-full group/image">
                <img
                    src={gif}
                    alt={name}
                    className="w-full h-full object-cover opacity-90 transition-opacity"
                    onError={() => setError(true)}
                />

                {/* Overlay button to search video manually */}
                <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(name + " exercise technique")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-2 right-2 bg-black/60 hover:bg-red-600/90 text-white p-1.5 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover/image:opacity-100 scale-90 hover:scale-100"
                    title="Buscar video en YouTube"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Icon name="PlayCircle" className="w-4 h-4" />
                </a>
            </div>
        );
    }

    // 3. Last resort: Link button
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/50 gap-2 p-2 text-center group/fallback">
            <Icon name="Dumbbell" className="w-6 h-6 text-slate-700 mb-1" />
            <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(name + " exercise technique")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 rounded-full transition-all hover:bg-cyan-500/20"
                onClick={(e) => e.stopPropagation()}
            >
                <span>Ver en YouTube</span>
            </a>
        </div>
    );
};

// --- MAIN APP ---
const GymRoutineApp = () => {
    const [activeTab, setActiveTab] = useState('routine');
    const [exercisesDb, setExercisesDb] = useState({});
    const [weights, setWeights] = useState({});
    const [completedToday, setCompletedToday] = useState({});

    // Settings per day
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('gym-routine-settings-es');
        if (saved) return JSON.parse(saved);
        const initial = {};
        DAYS_ES.forEach(day => initial[day] = { isRest: false, muscles: [] });
        return initial;
    });

    const [dailyRoutine, setDailyRoutine] = useState([]);
    const [isSpinning, setIsSpinning] = useState(false);

    // Load on mount
    useEffect(() => {
        const w = JSON.parse(localStorage.getItem('gym_weights') || '{}');
        setWeights(w);

        fetch('./data/exercises_db.json')
            .then(res => res.json())
            .then(data => {
                setExercisesDb(data);
            })
            .catch(err => console.error("Error cargando BD", err));
    }, []);

    // Save Settings
    useEffect(() => {
        localStorage.setItem('gym-routine-settings-es', JSON.stringify(settings));
    }, [settings]);

    const getToday = () => {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return days[new Date().getDay()];
    };

    const today = getToday();
    const todayConfig = settings[today] || { isRest: false, muscles: [] };

    // --- Weighted Lottery Logic ---
    const generateRoutine = () => {
        if (todayConfig.isRest || todayConfig.muscles.length === 0) {
            setDailyRoutine([]);
            return;
        }

        setIsSpinning(true);
        setCompletedToday({});

        setTimeout(() => {
            const newRoutine = [];

            todayConfig.muscles.forEach(muscle => {
                const candidates = exercisesDb[muscle] || [];
                if (candidates.length === 0) return;

                let pool = [...candidates];

                for (let i = 0; i < 2; i++) {
                    if (pool.length === 0) break;

                    const weightedPool = pool.map(ex => ({
                        ex,
                        prob: 1 / ((weights[ex.name] || 0) + 1)
                    }));

                    const totalWeight = weightedPool.reduce((sum, item) => sum + item.prob, 0);
                    let r = Math.random() * totalWeight;

                    let winner = weightedPool[0].ex;
                    for (const item of weightedPool) {
                        r -= item.prob;
                        if (r <= 0) {
                            winner = item.ex;
                            break;
                        }
                    }

                    newRoutine.push({ ...winner, muscle, id: `${muscle}-${i}-${Date.now()}` });
                    pool = pool.filter(x => x.name !== winner.name);
                }
            });

            setDailyRoutine(newRoutine);
            setIsSpinning(false);
        }, 1500);
    };

    // Auto-generate on DB load
    const hasLoaded = useRef(false);
    useEffect(() => {
        if (!hasLoaded.current && Object.keys(exercisesDb).length > 0 && todayConfig.muscles.length > 0) {
            generateRoutine();
            hasLoaded.current = true;
        }
    }, [exercisesDb, todayConfig.muscles]);

    // Mark as Completed or Uncompleted
    const toggleExerciseDone = (exName, id) => {
        const isDone = completedToday[id];

        // Update global weight logic
        // If we are marking as done (was not done), increment.
        // If we are unmarking (was done), decrement.
        const currentWeight = weights[exName] || 0;
        let newWeight = currentWeight;

        if (!isDone) {
            newWeight = currentWeight + 1;
        } else {
            // Prevent going below 0, though shouldn't happen if logic is correct
            newWeight = Math.max(0, currentWeight - 1);
        }

        const newWeights = { ...weights, [exName]: newWeight };
        setWeights(newWeights);
        localStorage.setItem('gym_weights', JSON.stringify(newWeights));

        // Toggle completed state in UI
        setCompletedToday(prev => {
            const newState = { ...prev };
            if (isDone) {
                delete newState[id];
            } else {
                newState[id] = true;
            }
            return newState;
        });
    };

    // --- Helpers ---
    const getBlockedMuscles = (day) => {
        const dayIdx = DAYS_ES.indexOf(day);
        const prevDayIdx = (dayIdx - 1 + 7) % 7;
        const prevDay = DAYS_ES[prevDayIdx];
        const prevConfig = settings[prevDay];
        if (!prevConfig || prevConfig.isRest) return [];
        return prevConfig.muscles;
    };

    const toggleRestDay = (day) => {
        setSettings(prev => ({
            ...prev,
            [day]: { ...prev[day], isRest: !prev[day].isRest, muscles: [] }
        }));
    };

    const toggleMuscle = (day, m) => {
        setSettings(prev => {
            const current = prev[day].muscles;
            const isSelected = current.includes(m);
            const newMuscles = isSelected ? current.filter(x => x !== m) : [...current, m];
            return {
                ...prev,
                [day]: { ...prev[day], muscles: newMuscles }
            };
        });
    };

    // --- Render ---
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 pb-20 font-sans">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                        WORKOUT ROULETTE
                    </h1>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                        {today}, {new Date().toLocaleDateString('es-AR')}
                    </p>
                </div>
                <button
                    onClick={generateRoutine}
                    className="bg-slate-800 p-2 rounded-full cursor-pointer hover:bg-slate-700 transition-colors border border-slate-700 active:scale-95"
                    title="Generar nueva rutina"
                >
                    <Icon name="Dumbbell" className="text-cyan-400 w-5 h-5" />
                </button>
            </header>

            <main className="p-4 max-w-md mx-auto">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-900 border border-slate-800 p-1">
                        <TabsTrigger value="routine">
                            <Icon name="Calendar" className="w-4 h-4 mr-2" />
                            Rutina Hoy
                        </TabsTrigger>
                        <TabsTrigger value="setup">
                            <Icon name="Settings2" className="w-4 h-4 mr-2" />
                            Configurar
                        </TabsTrigger>
                    </TabsList>

                    {/* ROUTINE TAB */}
                    <TabsContent value="routine" className="space-y-4">
                        <Card className="bg-slate-900 border-slate-800 overflow-hidden">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-white text-2xl">Entrenamiento</CardTitle>
                                        <CardDescription>
                                            {todayConfig.isRest ? "Día de descanso" : `${todayConfig.muscles.length} grupos musculares`}
                                        </CardDescription>
                                    </div>
                                    {!todayConfig.isRest && todayConfig.muscles.length > 0 && (
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={generateRoutine}
                                            className={`${isSpinning ? 'animate-spin' : ''}`}
                                            disabled={isSpinning}
                                            title="Girar ruleta"
                                        >
                                            <Icon name={isSpinning ? "RefreshCw" : "Dice5"} className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                {todayConfig.isRest ? (
                                    <div className="py-12 text-center space-y-4">
                                        <div className="bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                                            <Icon name="Moon" className="text-emerald-400 w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">¡Día de Descanso!</h3>
                                            <p className="text-slate-400 text-sm max-w-[200px] mx-auto">
                                                Tus músculos crecen mientras descansas. ¡Disfrútalo!
                                            </p>
                                        </div>
                                    </div>
                                ) : todayConfig.muscles.length === 0 ? (
                                    <div className="py-12 text-center space-y-4">
                                        <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                                            <Icon name="Info" className="text-slate-400 w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">Sin configurar</h3>
                                            <p className="text-slate-400 text-sm mb-4">No has seleccionado músculos para {today}.</p>
                                            <Button onClick={() => setActiveTab('setup')}>Ir a Configuración</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {todayConfig.muscles.map(m => (
                                                <span key={m} className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase rounded">
                                                    {m}
                                                </span>
                                            ))}
                                        </div>
                                        <Separator />

                                        {isSpinning ? (
                                            <div className="py-16 flex flex-col items-center justify-center gap-4 text-cyan-400">
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-30 animate-pulse rounded-full"></div>
                                                    <Icon name="Dice5" className="w-16 h-16 animate-bounce relative" />
                                                </div>
                                                <p className="text-sm font-mono tracking-widest animate-pulse">GIRANDO RULETA...</p>
                                            </div>
                                        ) : (
                                            <ul className="space-y-4 pt-2">
                                                {[...dailyRoutine].sort((a, b) => a.name.localeCompare(b.name)).map((ex, idx) => (
                                                    <li
                                                        key={ex.id}
                                                        className={`flex flex-col p-4 bg-slate-800/50 border rounded-xl group transition-all duration-300 ${completedToday[ex.id] ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-slate-700 hover:border-cyan-500/50'}`}
                                                        style={{ animationDelay: `${idx * 100}ms` }}
                                                    >
                                                        <div className="flex items-center">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-xs font-bold border transition-colors ${completedToday[ex.id] ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-slate-900 border-slate-700 text-cyan-400'}`}>
                                                                {completedToday[ex.id] ? <Icon name="Check" className="w-4 h-4" /> : idx + 1}
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className={`font-semibold transition-colors ${completedToday[ex.id] ? 'text-emerald-400' : 'text-slate-100'}`}>{ex.name}</p>
                                                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{ex.muscle}</p>
                                                            </div>
                                                            <button
                                                                onClick={() => toggleExerciseDone(ex.name, ex.id)}
                                                                className={`p-2 rounded-full transition-all ${completedToday[ex.id] ? 'text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20' : 'text-slate-600 hover:text-emerald-500 hover:bg-slate-700'}`}
                                                                title={completedToday[ex.id] ? "¡Hecho! Click para deshacer" : "Marcar como hecho"}
                                                            >
                                                                <Icon name="CheckCircle2" className="w-6 h-6" />
                                                            </button>
                                                        </div>

                                                        {/* GIF/Image with Fallback */}
                                                        {/* GIF/Image with Fallback */}
                                                        <div className="mt-3 ml-11">
                                                            <div className="w-full h-40 rounded-lg bg-slate-900/50 overflow-hidden border border-slate-700 relative group-hover:border-slate-600 transition-colors">
                                                                <ExerciseImage name={ex.name} gif={ex.gif} videoId={ex.videoId} />
                                                            </div>
                                                        </div>

                                                        {/* Instructions */}


                                                        {/* Weight indicator */}
                                                        <div className="mt-2 ml-11 flex items-center gap-2">
                                                            <span className="text-[10px] text-slate-600">
                                                                Veces realizado: {weights[ex.name] || 0}
                                                            </span>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {!todayConfig.isRest && !isSpinning && dailyRoutine.length > 0 && (
                            <div className="flex items-start gap-3 p-4 rounded-lg border border-amber-500/20 bg-amber-500/5 text-amber-200">
                                <Icon name="AlertCircle" className="h-5 w-5 text-amber-500 shrink-0" />
                                <p className="text-xs leading-relaxed">
                                    Recuerda calentar 5-10 minutos antes de comenzar. Marca los ejercicios completados para diversificar futuras sesiones.
                                </p>
                            </div>
                        )}
                    </TabsContent>

                    {/* SETUP TAB */}
                    <TabsContent value="setup" className="space-y-6">
                        {DAYS_ES.map(day => {
                            const blocked = getBlockedMuscles(day);
                            const isToday = day === today;
                            const config = settings[day];

                            return (
                                <Card key={day} className={`bg-slate-900 border-slate-800 transition-all ${isToday ? 'ring-1 ring-cyan-500/50' : ''}`}>
                                    <CardHeader className="pb-3">
                                        <div className="flex flex-row items-center justify-between w-full">
                                            <div className="flex items-center gap-2 flex-1 justify-start">
                                                <CardTitle className={`text-lg text-left ${isToday ? 'text-cyan-400' : 'text-white'}`}>{day}</CardTitle>
                                                {isToday && <span className="text-[10px] px-2 py-0.5 bg-cyan-500 text-white rounded-full font-bold uppercase">Hoy</span>}
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs text-slate-400">Descanso</span>
                                                <Switch
                                                    id={`rest-${day}`}
                                                    checked={config.isRest}
                                                    onCheckedChange={() => toggleRestDay(day)}
                                                />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    {!config.isRest && (
                                        <CardContent className="pt-0">
                                            <div className="grid grid-cols-2 gap-2">
                                                {MUSCLE_GROUPS_ES.map(m => {
                                                    const isBlocked = blocked.includes(m);
                                                    const isSelected = config.muscles.includes(m);
                                                    return (
                                                        <div key={m} className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${isBlocked ? 'opacity-40' : 'hover:bg-slate-800'} ${isSelected ? 'bg-cyan-500/5' : ''}`}>
                                                            <Checkbox
                                                                id={`${day}-${m}`}
                                                                checked={isSelected}
                                                                disabled={isBlocked}
                                                                onCheckedChange={() => toggleMuscle(day, m)}
                                                            />
                                                            <label htmlFor={`${day}-${m}`} className="text-xs font-medium leading-none text-slate-300 cursor-pointer">
                                                                {m}
                                                            </label>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            {blocked.length > 0 && (
                                                <div className="mt-3 flex items-start gap-2 p-2 bg-slate-950/50 rounded border border-slate-800">
                                                    <Icon name="Info" className="w-3 h-3 text-slate-500 mt-0.5 shrink-0" />
                                                    <p className="text-[10px] text-slate-500 italic">
                                                        Músculos en gris bloqueados por recuperación (regla 24h).
                                                    </p>
                                                </div>
                                            )}
                                        </CardContent>
                                    )}
                                </Card>
                            );
                        })}
                        <div className="pb-10 pt-4">
                            <Button
                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 rounded-xl shadow-lg shadow-emerald-900/20"
                                onClick={() => {
                                    hasLoaded.current = false; // Reset to regenerate
                                    setActiveTab('routine');
                                    setTimeout(generateRoutine, 100);
                                }}
                            >
                                Guardar y Ver Rutina
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>

            {/* Mobile Nav */}
            <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 h-16 flex items-center justify-around px-6 z-20">
                <button onClick={() => setActiveTab('routine')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'routine' ? 'text-cyan-400' : 'text-slate-500'}`}>
                    <Icon name="Calendar" className="w-6 h-6" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Rutina</span>
                </button>
                <div className="relative -top-6">
                    <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-20 animate-pulse"></div>
                    <button onClick={generateRoutine} className="relative bg-cyan-600 p-4 rounded-full border-4 border-slate-950 shadow-xl text-white hover:bg-cyan-500 transition-colors" title="Girar Ruleta">
                        <Icon name="Dumbbell" className="w-6 h-6" />
                    </button>
                </div>
                <button onClick={() => setActiveTab('setup')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'setup' ? 'text-cyan-400' : 'text-slate-500'}`}>
                    <Icon name="Settings2" className="w-6 h-6" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Ajustes</span>
                </button>
            </nav>
        </div>
    );
};

// Mount
const root = createRoot(document.getElementById('root'));
root.render(<GymRoutineApp />);
