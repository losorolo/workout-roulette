
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Dumbbell, 
  Settings2, 
  Calendar, 
  RefreshCw, 
  CheckCircle2, 
  Moon, 
  Info,
  AlertCircle,
  ChevronRight
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  Button, 
  Checkbox, 
  Switch, 
  Label,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
  Alert,
  AlertDescription
} from '@/components/ui';

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const MUSCLE_GROUPS = [
  'Abdominals', 'Biceps', 'Calves', 'Chest', 'Forearms', 'Glutes',
  'Hamstrings', 'Lats', 'Lower Back', 'Middle Back', 'Quadriceps',
  'Shoulders', 'Traps', 'Triceps', 'Adductors', 'Abductors', 'Neck', 'Obliques'
];

// Mock database of exercises
const EXERCISE_DB = {
  'Abdominals': ['Crunches', 'Plank', 'Leg Raises', 'Russian Twists', 'Dead Bug'],
  'Biceps': ['Barbell Curls', 'Dumbbell Hammer Curls', 'Preacher Curls', 'Concentration Curls'],
  'Calves': ['Standing Calf Raises', 'Seated Calf Raises', 'Donkey Calf Raises'],
  'Chest': ['Bench Press', 'Push-ups', 'Chest Flys', 'Incline Press', 'Dips'],
  'Forearms': ['Wrist Curls', 'Reverse Curls', 'Farmer Walks'],
  'Glutes': ['Hip Thrusts', 'Glute Bridges', 'Lunges', 'Sumo Squats'],
  'Hamstrings': ['Deadlifts', 'Leg Curls', 'Good Mornings'],
  'Lats': ['Pull-ups', 'Lat Pulldowns', 'Bent Over Rows'],
  'Lower Back': ['Hyperextensions', 'Supermans', 'Bird-Dog'],
  'Middle Back': ['Seated Rows', 'T-Bar Rows', 'Face Pulls'],
  'Quadriceps': ['Squats', 'Leg Press', 'Leg Extensions', 'Bulgarian Split Squats'],
  'Shoulders': ['Overhead Press', 'Lateral Raises', 'Front Raises', 'Rear Delt Flys'],
  'Traps': ['Shrugs', 'Upright Rows'],
  'Triceps': ['Skull Crushers', 'Tricep Pushdowns', 'Overhead Extensions'],
  'Adductors': ['Adductor Machine', 'Side Lunges'],
  'Abductors': ['Abductor Machine', 'Clamshells'],
  'Neck': ['Neck Flexion', 'Neck Extensions'],
  'Obliques': ['Side Planks', 'Bicycle Crunches', 'Woodchoppers']
};

const GymRoutineApp = () => {
  const [activeTab, setActiveTab] = useState('routine');
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('gym-routine-settings');
    if (saved) return JSON.parse(saved);
    const initial = {};
    DAYS.forEach(day => {
      initial[day] = { isRest: false, muscles: [] };
    });
    return initial;
  });

  const [shuffledExercises, setShuffledExercises] = useState([]);
  
  // Persist settings
  useEffect(() => {
    localStorage.setItem('gym-routine-settings', JSON.stringify(settings));
  }, [settings]);

  // Logic to determine blocked muscles for a given day
  const getBlockedMuscles = (day) => {
    const dayIdx = DAYS.indexOf(day);
    const prevDay = DAYS[(dayIdx + 6) % 7];
    const prevConfig = settings[prevDay];

    if (!prevConfig || prevConfig.isRest || prevConfig.muscles.length === 0) {
      return [];
    }

    const prevSelected = prevConfig.muscles;
    
    // Calf Exception logic
    const arms = ['Biceps', 'Triceps', 'Forearms'];
    const back = ['Lats', 'Lower Back', 'Middle Back', 'Traps'];
    const allowedForCalves = [...arms, ...back, 'Calves'];
    
    const canTrainCalves = prevSelected.every(m => allowedForCalves.includes(m));

    return prevSelected.filter(m => {
      if (m === 'Calves' && canTrainCalves) return false;
      return true;
    });
  };

  const toggleRestDay = (day) => {
    setSettings(prev => ({
      ...prev,
      [day]: { ...prev[day], isRest: !prev[day].isRest, muscles: [] }
    }));
  };

  const toggleMuscle = (day, muscle) => {
    setSettings(prev => {
      const currentMuscles = prev[day].muscles;
      const isSelected = currentMuscles.includes(muscle);
      const newMuscles = isSelected 
        ? currentMuscles.filter(m => m !== muscle)
        : [...currentMuscles, muscle];
      
      return {
        ...prev,
        [day]: { ...prev[day], muscles: newMuscles }
      };
    });
  };

  const getToday = () => {
    const daysEn = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return daysEn[new Date().getDay()];
  };

  const today = getToday();
  const todayConfig = settings[today];

  const generateRoutine = (force = false) => {
    if (todayConfig.isRest || todayConfig.muscles.length === 0) {
      setShuffledExercises([]);
      return;
    }

    const allExercises = [];
    todayConfig.muscles.forEach(m => {
      const muscleExs = EXERCISE_DB[m] || [];
      // Pick 2 random exercises per muscle group for the daily routine
      const picked = [...muscleExs].sort(() => 0.5 - Math.random()).slice(0, 2);
      picked.forEach(name => allExercises.push({ name, muscle: m }));
    });

    setShuffledExercises([...allExercises].sort(() => 0.5 - Math.random()));
  };

  useEffect(() => {
    generateRoutine();
  }, [todayConfig]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pb-20 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            MERLIN WORKOUT
          </h1>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{today}, {new Date().toLocaleDateString()}</p>
        </div>
        <div className="bg-slate-800 p-2 rounded-full">
          <Dumbbell className="text-cyan-400 w-5 h-5" />
        </div>
      </header>

      <main className="p-4 max-w-md mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-900 border border-slate-800 p-1">
            <TabsTrigger value="routine" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white transition-all">
              <Calendar className="w-4 h-4 mr-2" />
              Rutina Hoy
            </TabsTrigger>
            <TabsTrigger value="setup" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white transition-all">
              <Settings2 className="w-4 h-4 mr-2" />
              Configurar
            </TabsTrigger>
          </TabsList>

          {/* VIEW: DAILY ROUTINE */}
          <TabsContent value="routine" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Card className="bg-slate-900 border-slate-800 overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white text-2xl">Entrenamiento</CardTitle>
                    <CardDescription className="text-slate-400">
                      {todayConfig.isRest ? "Día de recuperación" : `${todayConfig.muscles.length} grupos musculares`}
                    </CardDescription>
                  </div>
                  {!todayConfig.isRest && todayConfig.muscles.length > 0 && (
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="border-slate-700 hover:bg-slate-800 text-cyan-400"
                      onClick={() => generateRoutine(true)}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {todayConfig.isRest ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                      <Moon className="text-emerald-400 w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">¡Día de Descanso!</h3>
                      <p className="text-slate-400 text-sm max-w-[200px] mx-auto">
                        Tus músculos crecen mientras descansas. ¡Disfruta el relax!
                      </p>
                    </div>
                  </div>
                ) : todayConfig.muscles.length === 0 ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                      <Info className="text-slate-400 w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Sin configurar</h3>
                      <p className="text-slate-400 text-sm mb-4">No has seleccionado músculos para hoy.</p>
                      <Button onClick={() => setActiveTab('setup')} className="bg-cyan-600 hover:bg-cyan-500">
                        Ir a Configuración
                      </Button>
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
                    <Separator className="bg-slate-800" />
                    <ul className="space-y-3 pt-2">
                      {shuffledExercises.map((ex, idx) => (
                        <li key={idx} className="flex items-center p-3 bg-slate-800/50 border border-slate-800 rounded-lg group hover:border-cyan-500/50 transition-colors">
                          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center mr-3 text-xs font-bold text-cyan-400 border border-slate-700">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-slate-100 font-medium">{ex.name}</p>
                            <p className="text-xs text-slate-500 font-medium">{ex.muscle}</p>
                          </div>
                          <CheckCircle2 className="w-5 h-5 text-slate-700 group-hover:text-emerald-500 transition-colors" />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {!todayConfig.isRest && (
              <Alert className="bg-slate-900 border-amber-500/50 text-amber-200">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-xs">
                  Recuerda calentar 5-10 minutos antes de comenzar tu rutina de {today}.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          {/* VIEW: WORKOUT SETUP */}
          <TabsContent value="setup" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {DAYS.map((day) => {
              const blockedMuscles = getBlockedMuscles(day);
              const isToday = day === today;
              
              return (
                <Card key={day} className={`bg-slate-900 border-slate-800 transition-all ${isToday ? 'ring-1 ring-cyan-500/50' : ''}`}>
                  <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2">
                      <CardTitle className={`text-lg ${isToday ? 'text-cyan-400' : 'text-white'}`}>
                        {day}
                      </CardTitle>
                      {isToday && <span className="text-[10px] px-2 py-0.5 bg-cyan-500 text-white rounded-full font-bold uppercase">Hoy</span>}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`rest-${day}`} className="text-xs text-slate-400">Descanso</Label>
                      <Switch 
                        id={`rest-${day}`} 
                        checked={settings[day].isRest}
                        onCheckedChange={() => toggleRestDay(day)}
                        className="data-[state=checked]:bg-emerald-500"
                      />
                    </div>
                  </CardHeader>
                  
                  {!settings[day].isRest && (
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 gap-2">
                        {MUSCLE_GROUPS.map(muscle => {
                          const isBlocked = blockedMuscles.includes(muscle);
                          const isSelected = settings[day].muscles.includes(muscle);
                          
                          return (
                            <div 
                              key={muscle} 
                              className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${
                                isBlocked ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-800'
                              } ${isSelected ? 'bg-cyan-500/5' : ''}`}
                            >
                              <Checkbox 
                                id={`${day}-${muscle}`}
                                checked={isSelected}
                                disabled={isBlocked}
                                onCheckedChange={() => toggleMuscle(day, muscle)}
                                className="border-slate-700 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                              />
                              <label
                                htmlFor={`${day}-${muscle}`}
                                className={`text-xs font-medium leading-none cursor-pointer ${
                                  isBlocked ? 'text-slate-600' : 'text-slate-300'
                                }`}
                              >
                                {muscle}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                      {blockedMuscles.length > 0 && (
                        <div className="mt-3 flex items-start gap-2 p-2 bg-slate-950/50 rounded border border-slate-800">
                          <Info className="w-3 h-3 text-slate-500 mt-0.5" />
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
               <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 rounded-xl shadow-lg shadow-emerald-900/20" onClick={() => setActiveTab('routine')}>
                Guardar y Ver Rutina
               </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Navigation Bar (Mobile Style) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 h-16 flex items-center justify-around px-6 z-20">
        <button 
          onClick={() => setActiveTab('routine')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'routine' ? 'text-cyan-400' : 'text-slate-500'}`}
        >
          <Calendar className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Rutina</span>
        </button>
        <div className="relative -top-6">
          <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-20 animate-pulse"></div>
          <button className="relative bg-cyan-600 p-4 rounded-full border-4 border-slate-950 shadow-xl" onClick={() => setActiveTab('routine')}>
             <Dumbbell className="text-white w-6 h-6" />
          </button>
        </div>
        <button 
          onClick={() => setActiveTab('setup')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'setup' ? 'text-cyan-400' : 'text-slate-500'}`}
        >
          <Settings2 className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Ajustes</span>
        </button>
      </nav>
    </div>
  );
};

export default GymRoutineApp;
