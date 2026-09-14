import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Plus, Trash2, Copy, Check, Award } from 'lucide-react';

interface CourseRow {
  id: string;
  name: string;
  gradeValue: number;
  credits: number;
}

const GRADE_OPTIONS = [
  { label: 'A (4.0)', value: 4.0 },
  { label: 'A- (3.7)', value: 3.7 },
  { label: 'B+ (3.3)', value: 3.3 },
  { label: 'B (3.0)', value: 3.0 },
  { label: 'B- (2.7)', value: 2.7 },
  { label: 'C+ (2.3)', value: 2.3 },
  { label: 'C (2.0)', value: 2.0 },
  { label: 'C- (1.7)', value: 1.7 },
  { label: 'D+ (1.3)', value: 1.3 },
  { label: 'D (1.0)', value: 1.0 },
  { label: 'F (0.0)', value: 0.0 },
];

export const GpaCalculator: React.FC = () => {
  const { t, addHistory } = useApp();
  const [courses, setCourses] = useState<CourseRow[]>([
    { id: '1', name: 'Mathematics 101', gradeValue: 4.0, credits: 4 },
    { id: '2', name: 'Computer Science 102', gradeValue: 3.7, credits: 3 },
    { id: '3', name: 'English Literature', gradeValue: 3.3, credits: 3 },
    { id: '4', name: 'Physics Laboratory', gradeValue: 4.0, credits: 2 },
  ]);
  const [copied, setCopied] = useState(false);

  const addCourse = () => {
    setCourses((prev) => [
      ...prev,
      { id: Date.now().toString(), name: `Course ${prev.length + 1}`, gradeValue: 3.0, credits: 3 },
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof CourseRow, value: any) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const calculateGpa = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((c) => {
      const cr = Number(c.credits) || 0;
      totalCredits += cr;
      totalPoints += c.gradeValue * cr;
    });

    if (totalCredits <= 0) return null;
    const gpa = totalPoints / totalCredits;

    let honor = 'Good Academic Standing';
    let honorColor = 'text-emerald-700 dark:text-emerald-300';
    if (gpa >= 3.8) {
      honor = 'Summa Cum Laude / Dean’s List';
      honorColor = 'text-emerald-800 dark:text-emerald-300 font-bold';
    } else if (gpa >= 3.5) {
      honor = 'Magna Cum Laude';
      honorColor = 'text-emerald-700 dark:text-emerald-300';
    } else if (gpa < 2.0) {
      honor = 'Academic Warning';
      honorColor = 'text-rose-600 dark:text-rose-400';
    }

    return {
      gpa,
      totalCredits,
      totalPoints,
      honor,
      honorColor,
    };
  };

  const res = calculateGpa();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        {/* Course Rows */}
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Semester Courses &amp; Grades
            </h3>
            <button
              id="gpa-add-course"
              onClick={addCourse}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-slate-700 rounded-lg text-xs font-bold transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Course
            </button>
          </div>

          <div className="space-y-2">
            {courses.map((course, idx) => (
              <div
                key={course.id}
                className="grid grid-cols-12 gap-2 items-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60"
              >
                <div className="col-span-12 sm:col-span-6">
                  <input
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    placeholder="Course name"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <select
                    value={course.gradeValue}
                    onChange={(e) => updateCourse(course.id, 'gradeValue', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold"
                  >
                    {GRADE_OPTIONS.map((g) => (
                      <option key={g.label} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-4 sm:col-span-2">
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value))}
                    placeholder="Credits"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono text-center font-bold"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1 flex justify-center">
                  <button
                    type="button"
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length <= 1}
                    className="p-2 text-slate-400 hover:text-rose-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Remove course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results Card */}
        {res && (
          <div className="space-y-4 pt-2">
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  Calculated Grade Point Average (GPA)
                </span>
                <div className="text-4xl font-extrabold text-emerald-950 dark:text-emerald-100 font-mono mt-1">
                  {res.gpa.toFixed(2)} <span className="text-lg font-normal text-slate-500">/ 4.00</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-xs font-medium">
                  <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className={res.honorColor}>{res.honor}</span>
                </div>
              </div>

              <button
                id="gpa-copy-btn"
                onClick={() => {
                  handleCopy(`GPA: ${res.gpa.toFixed(2)} (${res.totalCredits} credits)`);
                  addHistory('gpa', `Semester GPA (${courses.length} courses)`, `${res.gpa.toFixed(2)}`);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? t('btn_copied') : t('btn_copy')}
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Total Completed Credits
                </span>
                <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100 mt-1">
                  {res.totalCredits} Hours
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Total Quality Grade Points
                </span>
                <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100 mt-1">
                  {res.totalPoints.toFixed(1)} Points
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
