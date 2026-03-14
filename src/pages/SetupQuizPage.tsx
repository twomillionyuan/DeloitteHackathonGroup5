import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const QUIZ_STORAGE_KEY = "panda-setup-quiz";

const preferenceOptions = [
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Flexitarian",
  "High-protein",
  "Low-carb",
  "Gluten-free",
  "Dairy-free",
];

const allergyOptions = [
  "Milk",
  "Eggs",
  "Fish",
  "Crustacean shellfish",
  "Tree nuts",
  "Peanuts",
  "Wheat",
  "Soybeans",
  "Sesame",
];

const cuisineOptions = [
  "Mexican",
  "Scandinavian",
  "East Asian",
  "South Asian",
  "Mediterranean",
  "Middle Eastern",
  "Italian",
  "American",
];

type QuizData = {
  preferences: string[];
  allergies: string[];
  cuisines: string[];
};

type QuizStep = "welcome" | "preferences" | "allergies" | "cuisines" | "done";

const emptyQuizData: QuizData = {
  preferences: [],
  allergies: [],
  cuisines: [],
};

const toggleValue = (values: string[], value: string) =>
  values.includes(value) ? values.filter((item) => item !== value) : [...values, value];

const normalizeCustomValue = (value: string) => value.trim().replace(/\s+/g, " ");

const SelectionStep = ({
  sectionLabel,
  title,
  options,
  values,
  customValue,
  onToggle,
  onCustomValueChange,
  onAddCustom,
  onBack,
  onNext,
  nextLabel,
}: {
  sectionLabel: string;
  title: string;
  options: string[];
  values: string[];
  customValue: string;
  onToggle: (value: string) => void;
  onCustomValueChange: (value: string) => void;
  onAddCustom: () => void;
  onBack: () => void;
  onNext: () => void;
  nextLabel: string;
}) => {
  const allOptions = useMemo(
    () => [...options, ...values.filter((value) => !options.includes(value))],
    [options, values],
  );

  return (
    <motion.div
      key={sectionLabel}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24 }}
      className="mx-auto max-w-md px-4 pt-10 pb-10"
    >
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="mt-6">
        <span className="section-label">{sectionLabel}</span>
        <h1 className="mt-3 font-display text-[1.95rem] leading-none text-foreground">{title}</h1>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {allOptions.map((option) => {
          const active = values.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                active ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <form
        className="mt-8"
        onSubmit={(event) => {
          event.preventDefault();
          onAddCustom();
        }}
      >
        <label className="section-label">Add your own</label>
        <div className="mt-3 flex items-center gap-2">
          <input
            value={customValue}
            onChange={(event) => onCustomValueChange(event.target.value)}
            placeholder="Type and add"
            className="h-11 flex-1 rounded-full border border-border px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
          <button
            type="submit"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:opacity-90"
            aria-label="Add custom option"
          >
            <Plus size={16} />
          </button>
        </div>
      </form>

      <div className="mt-10 flex items-center justify-between gap-3 border-t border-border pt-5">
        <p className="text-xs text-muted-foreground">
          {values.length} selected
        </p>
        <button
          type="button"
          onClick={onNext}
          className="rounded-full bg-eco-bad px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.01]"
        >
          {nextLabel}
        </button>
      </div>
    </motion.div>
  );
};

const SetupQuizPage = () => {
  const [step, setStep] = useState<QuizStep>("welcome");
  const [quizData, setQuizData] = useState<QuizData>(() => {
    if (typeof window === "undefined") {
      return emptyQuizData;
    }

    const saved = window.localStorage.getItem(QUIZ_STORAGE_KEY);
    if (!saved) {
      return emptyQuizData;
    }

    try {
      return JSON.parse(saved) as QuizData;
    } catch {
      return emptyQuizData;
    }
  });
  const [customPreference, setCustomPreference] = useState("");
  const [customAllergy, setCustomAllergy] = useState("");
  const [customCuisine, setCustomCuisine] = useState("");

  const persistQuizData = (nextData: QuizData) => {
    setQuizData(nextData);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(nextData));
    }
  };

  const addCustomValue = (
    event: FormEvent | null,
    rawValue: string,
    values: string[],
    updater: (nextValues: string[]) => void,
    reset: () => void,
  ) => {
    if (event) {
      event.preventDefault();
    }

    const normalized = normalizeCustomValue(rawValue);
    if (!normalized || values.includes(normalized)) {
      reset();
      return;
    }

    updater([...values, normalized]);
    reset();
  };

  if (step === "welcome") {
    return (
      <div className="min-h-screen bg-background">
        <div className="min-h-screen bg-[linear-gradient(180deg,#f9c0c8_0%,#f9c0c8_78%,#ff5a4f_78%,#ff5a4f_100%)]">
          <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-between px-6 py-8 text-center">
            <div className="w-full">
              <Link
                to="/profile"
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/70 transition-colors hover:text-foreground"
              >
                <ArrowLeft size={16} />
                Back
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="mx-auto max-w-[17rem]">
                <h1 className="font-display text-[3rem] font-extrabold uppercase tracking-[-0.06em] text-foreground">
                  PanDa
                </h1>
                <p className="-mt-1 text-xs font-bold uppercase tracking-[0.22em] text-foreground/70">
                  Eat greener, your way
                </p>
              </div>

              <button
                type="button"
                onClick={() => setStep("preferences")}
                className="mt-12 h-14 w-52 rounded-full bg-eco-bad text-base font-extrabold text-white shadow-[0_12px_24px_rgba(58,34,34,0.2)] transition-transform hover:scale-[1.01]"
              >
                Start quiz
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.3 }}
              className="w-full"
            >
              <img
                src="/favicon.svg"
                alt="PanDa mascot"
                className="mx-auto w-52 max-w-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "preferences") {
    return (
      <SelectionStep
        sectionLabel="Step 1"
        title="What food preferences do you have?"
        options={preferenceOptions}
        values={quizData.preferences}
        customValue={customPreference}
        onToggle={(value) => persistQuizData({ ...quizData, preferences: toggleValue(quizData.preferences, value) })}
        onCustomValueChange={setCustomPreference}
        onAddCustom={() =>
          addCustomValue(
            null,
            customPreference,
            quizData.preferences,
            (nextValues) => persistQuizData({ ...quizData, preferences: nextValues }),
            () => setCustomPreference(""),
          )
        }
        onBack={() => setStep("welcome")}
        onNext={() => setStep("allergies")}
        nextLabel="Continue"
      />
    );
  }

  if (step === "allergies") {
    return (
      <SelectionStep
        sectionLabel="Step 2"
        title="Do you have any allergies?"
        options={allergyOptions}
        values={quizData.allergies}
        customValue={customAllergy}
        onToggle={(value) => persistQuizData({ ...quizData, allergies: toggleValue(quizData.allergies, value) })}
        onCustomValueChange={setCustomAllergy}
        onAddCustom={() =>
          addCustomValue(
            null,
            customAllergy,
            quizData.allergies,
            (nextValues) => persistQuizData({ ...quizData, allergies: nextValues }),
            () => setCustomAllergy(""),
          )
        }
        onBack={() => setStep("preferences")}
        onNext={() => setStep("cuisines")}
        nextLabel="Continue"
      />
    );
  }

  if (step === "cuisines") {
    return (
      <SelectionStep
        sectionLabel="Step 3"
        title="What kind of food do you like?"
        options={cuisineOptions}
        values={quizData.cuisines}
        customValue={customCuisine}
        onToggle={(value) => persistQuizData({ ...quizData, cuisines: toggleValue(quizData.cuisines, value) })}
        onCustomValueChange={setCustomCuisine}
        onAddCustom={() =>
          addCustomValue(
            null,
            customCuisine,
            quizData.cuisines,
            (nextValues) => persistQuizData({ ...quizData, cuisines: nextValues }),
            () => setCustomCuisine(""),
          )
        }
        onBack={() => setStep("allergies")}
        onNext={() => setStep("done")}
        nextLabel="Save"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24 }}
      className="mx-auto min-h-screen max-w-md px-4 pt-10 pb-10"
    >
      <span className="section-label">Set up complete</span>
      <h1 className="mt-3 font-display text-[2rem] leading-none text-foreground">Your preferences are saved.</h1>

      <div className="mt-8 space-y-6">
        <div>
          <p className="section-label">Food preferences</p>
          <p className="mt-2 text-sm text-foreground">
            {quizData.preferences.length > 0 ? quizData.preferences.join(", ") : "None selected"}
          </p>
        </div>
        <div>
          <p className="section-label">Allergies</p>
          <p className="mt-2 text-sm text-foreground">
            {quizData.allergies.length > 0 ? quizData.allergies.join(", ") : "None selected"}
          </p>
        </div>
        <div>
          <p className="section-label">Favorite cuisines</p>
          <p className="mt-2 text-sm text-foreground">
            {quizData.cuisines.length > 0 ? quizData.cuisines.join(", ") : "None selected"}
          </p>
        </div>
      </div>

      <div className="mt-10 flex items-center gap-3">
        <Link
          to="/profile"
          className="rounded-full bg-eco-bad px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.01]"
        >
          Back to profile
        </Link>
        <button
          type="button"
          onClick={() => setStep("preferences")}
          className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          Edit answers
        </button>
      </div>
    </motion.div>
  );
};

export default SetupQuizPage;
