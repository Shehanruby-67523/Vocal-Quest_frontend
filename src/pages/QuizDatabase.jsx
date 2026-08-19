import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Volume2, 
  Filter, 
  HelpCircle, 
  CheckCircle2, 
  X, 
  Database, 
  Sparkles, 
  Mic, 
  Layers,
  ArrowUpDown
} from 'lucide-react';
import AdminSidebar from '../Components/common/AdminSidebar';

export default function QuizDatabase() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Initial Question Bank State
  const [questions, setQuestions] = useState([
    {
      id: 'Q-101',
      question: 'Which voice keyword opens the Demon Guardian Challenge?',
      level: 'Whispering Woods',
      category: 'Navigation',
      difficulty: 'Easy',
      correctAnswer: 'demon',
      options: ['demon', 'guardian', 'woods', 'start'],
      voiceAccuracy: '98%',
      status: 'Active'
    },
    {
      id: 'Q-102',
      question: 'Identify the correct pronunciation rule for past tense "-ed" endings.',
      level: 'Whispering Woods',
      category: 'Phonetics',
      difficulty: 'Medium',
      correctAnswer: 'Voiced consonants end with /d/ sound',
      options: ['Voiced consonants end with /d/ sound', 'All verbs end with /id/', 'Always silent', 'No rule applies'],
      voiceAccuracy: '92%',
      status: 'Active'
    },
    {
      id: 'Q-103',
      question: 'What is the vocal pitch emphasis in the sentence "SHE went to the store"?',
      level: 'Demon Guardian',
      category: 'Intonation',
      difficulty: 'Hard',
      correctAnswer: 'Emphasis on the subject SHE',
      options: ['Emphasis on the subject SHE', 'Emphasis on store', 'Flat intonation', 'Rising question pitch'],
      voiceAccuracy: '89%',
      status: 'Active'
    },
    {
      id: 'Q-104',
      question: 'Say the target word clearly: "ACCOMPLISHMENT"',
      level: 'Whispering Woods',
      category: 'Pronunciation',
      difficulty: 'Medium',
      correctAnswer: 'accomplishment',
      options: ['accomplishment', 'accomplish', 'completed', 'achievement'],
      voiceAccuracy: '95%',
      status: 'Active'
    },
    {
      id: 'Q-105',
      question: 'Which syllable has the primary stress in "PHOTOGRAPH"?',
      level: 'Demon Guardian',
      category: 'Syllables',
      difficulty: 'Medium',
      correctAnswer: 'First syllable (PHO)',
      options: ['First syllable (PHO)', 'Second syllable (TO)', 'Third syllable (GRAPH)', 'Equal stress'],
      voiceAccuracy: '91%',
      status: 'Active'
    }
  ]);

  // Form State for Modal
  const [formData, setFormData] = useState({
    question: '',
    level: 'Whispering Woods',
    category: 'Pronunciation',
    difficulty: 'Easy',
    correctAnswer: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: ''
  });

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesSearch = 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.correctAnswer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLevel = selectedLevel === 'All' || q.level === selectedLevel;
      const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;

      return matchesSearch && matchesLevel && matchesDifficulty;
    });
  }, [questions, searchQuery, selectedLevel, selectedDifficulty]);

  // Handlers
  const handleOpenAddModal = () => {
    setEditingQuestion(null);
    setFormData({
      question: '',
      level: 'Whispering Woods',
      category: 'Pronunciation',
      difficulty: 'Easy',
      correctAnswer: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (q) => {
    setEditingQuestion(q);
    setFormData({
      question: q.question,
      level: q.level,
      category: q.category,
      difficulty: q.difficulty,
      correctAnswer: q.correctAnswer,
      optionA: q.options[0] || '',
      optionB: q.options[1] || '',
      optionC: q.options[2] || '',
      optionD: q.options[3] || ''
    });
    setIsModalOpen(true);
  };

  const handleDeleteQuestion = (id) => {
    if (window.confirm(`Are you sure you want to delete question ${id}?`)) {
      setQuestions(prev => prev.filter(q => q.id !== id));
    }
  };

  const handleSaveQuestion = (e) => {
    e.preventDefault();
    if (!formData.question || !formData.correctAnswer) return;

    if (editingQuestion) {
      // Update
      setQuestions(prev => prev.map(q => q.id === editingQuestion.id ? {
        ...q,
        question: formData.question,
        level: formData.level,
        category: formData.category,
        difficulty: formData.difficulty,
        correctAnswer: formData.correctAnswer,
        options: [formData.optionA, formData.optionB, formData.optionC, formData.optionD].filter(Boolean)
      } : q));
    } else {
      // Create
      const newQ = {
        id: `Q-${100 + questions.length + 1}`,
        question: formData.question,
        level: formData.level,
        category: formData.category,
        difficulty: formData.difficulty,
        correctAnswer: formData.correctAnswer,
        options: [formData.optionA, formData.optionB, formData.optionC, formData.optionD].filter(Boolean),
        voiceAccuracy: '95%',
        status: 'Active'
      };
      setQuestions([newQ, ...questions]);
    }
    setIsModalOpen(false);
  };

  const handleAudioPreview = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#070b13] text-slate-100 font-sans antialiased overflow-x-hidden select-none">
      
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Workspace Floor */}
      <main className="flex-1 flex flex-col items-start justify-start p-6 lg:p-10 max-w-7xl w-full mx-auto space-y-8 z-10">
        
        {/* Header Title Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-gold-400 font-bold text-xs uppercase tracking-widest mb-1">
              <Database size={14} />
              <span>Quiz Question Bank Manager Refined</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-wide">
              Question Database & Voice Calibration
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Create, edit, and configure voice recognition parameters for all game quiz nodes.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start sm:self-center">
            {/* Add New Question Button with Signature Logo Gold */}
            <button
              onClick={handleOpenAddModal}
              className="bg-gradient-to-r from-[#d9b74f] via-amber-400 to-[#d9b74f] hover:from-amber-400 hover:to-amber-500 text-[#031220] font-black px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition duration-200 text-xs shadow-[0_0_15px_rgba(217,183,79,0.35)] cursor-pointer transform active:scale-95 border border-[#d9b74f]/40"
            >
              <Plus size={18} strokeWidth={3} />
              <span>Add New Question</span>
            </button>

            {/* Admin Profile Icon */}
            <div 
              onClick={() => navigate('/admin/profile')}
              className="w-10 h-10 rounded-full border-2 border-[#d9b74f] overflow-hidden bg-[#0A2E52] p-0.5 cursor-pointer hover:scale-105 transition flex items-center justify-center shadow-[0_0_10px_rgba(217,183,79,0.35)]"
              title="Admin Profile"
            >
              <span className="text-xs font-black text-[#d9b74f]">SA</span>
            </div>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <div className="bg-[#0B2239] border border-slate-800 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
              <HelpCircle size={22} />
            </div>
            <div>
              <p className="text-xl font-extrabold text-white">{questions.length}</p>
              <p className="text-xs text-slate-400">Total Questions</p>
            </div>
          </div>

          <div className="bg-[#0B2239] border border-slate-800 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-xl font-extrabold text-white">
                {questions.filter(q => q.status === 'Active').length}
              </p>
              <p className="text-xs text-slate-400">Active Nodes</p>
            </div>
          </div>

          <div className="bg-[#0B2239] border border-slate-800 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
              <Mic size={22} />
            </div>
            <div>
              <p className="text-xl font-extrabold text-white">93.4%</p>
              <p className="text-xs text-slate-400">Avg Voice Recognition</p>
            </div>
          </div>

          <div className="bg-[#0B2239] border border-slate-800 p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
              <Layers size={22} />
            </div>
            <div>
              <p className="text-xl font-extrabold text-white">2 Levels</p>
              <p className="text-xs text-slate-400">Active Game Arenas</p>
            </div>
          </div>
        </div>

        {/* Filter & Search Utility Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full bg-[#0B2239] border border-slate-800 p-4 rounded-2xl">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search question text, ID, or keywords..."
              className="w-full bg-[#05172A] text-xs text-slate-200 pl-10 pr-4 py-2.5 rounded-xl border border-slate-700/70 focus:outline-none focus:border-[#d9b74f] transition"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-slate-400" />
              <span className="text-xs font-semibold text-slate-400">Level:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-[#05172A] border border-slate-700/70 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#d9b74f]"
              >
                <option value="All">All Levels</option>
                <option value="Whispering Woods">Whispering Woods</option>
                <option value="Demon Guardian">Demon Guardian</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Difficulty:</span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-[#05172A] border border-slate-700/70 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#d9b74f]"
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Question Bank Data Table */}
        <div className="w-full bg-[#0B2239] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#05172A] border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">ID</th>
                  <th className="py-4 px-6">Question & Prompt</th>
                  <th className="py-4 px-6">Level / Category</th>
                  <th className="py-4 px-6">Difficulty</th>
                  <th className="py-4 px-6">Target Answer</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-slate-300">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-4 px-6 font-mono font-bold text-amber-400">{q.id}</td>
                      
                      <td className="py-4 px-6 max-w-sm">
                        <p className="font-semibold text-white mb-1 leading-snug">{q.question}</p>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                          <Mic size={12} className="text-cyan-400" />
                          <span>Voice Acc: <strong className="text-emerald-400">{q.voiceAccuracy}</strong></span>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="block font-bold text-slate-200">{q.level}</span>
                        <span className="text-[11px] text-slate-400">{q.category}</span>
                      </td>

                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          q.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          q.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {q.difficulty}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <span className="font-mono text-xs bg-slate-900 px-2.5 py-1 rounded border border-slate-700 text-amber-300">
                          "{q.correctAnswer}"
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          {/* Audio Preview */}
                          <button
                            onClick={() => handleAudioPreview(q.question)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg transition cursor-pointer"
                            title="Test Audio Narration"
                          >
                            <Volume2 size={15} />
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => handleOpenEditModal(q)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg transition cursor-pointer"
                            title="Edit Question"
                          >
                            <Edit3 size={15} />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="p-2 bg-slate-800 hover:bg-rose-950 text-rose-400 rounded-lg transition cursor-pointer"
                            title="Delete Question"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-500 italic">
                      No quiz questions matched your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Add / Edit Question Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0B2239] border border-slate-700 rounded-3xl w-full max-w-xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X size={20} />
            </button>

            <div>
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Sparkles className="text-amber-400" size={20} />
                {editingQuestion ? 'Edit Quiz Question' : 'Add New Quiz Question'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Configure question text, target voice keywords, options, and level assignments.
              </p>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Question Prompt Text
                </label>
                <textarea
                  rows="3"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Enter question text..."
                  required
                  className="w-full bg-[#05172A] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400 transition resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full bg-[#05172A] border border-slate-700 text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Whispering Woods">Whispering Woods</option>
                    <option value="Demon Guardian">Demon Guardian</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Phonetics"
                    className="w-full bg-[#05172A] border border-slate-700 text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full bg-[#05172A] border border-slate-700 text-white rounded-xl p-2.5 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Target Voice Answer / Keyword
                </label>
                <input
                  type="text"
                  value={formData.correctAnswer}
                  onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                  placeholder="Expected voice pronunciation/keyword"
                  required
                  className="w-full bg-[#05172A] border border-slate-700 text-amber-300 font-mono rounded-xl p-2.5 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block font-semibold text-slate-400 mb-1">Option A</label>
                  <input
                    type="text"
                    value={formData.optionA}
                    onChange={(e) => setFormData({ ...formData, optionA: e.target.value })}
                    className="w-full bg-[#05172A] border border-slate-700 text-white rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-400 mb-1">Option B</label>
                  <input
                    type="text"
                    value={formData.optionB}
                    onChange={(e) => setFormData({ ...formData, optionB: e.target.value })}
                    className="w-full bg-[#05172A] border border-slate-700 text-white rounded-lg p-2"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#d9b74f] to-amber-400 hover:from-amber-400 hover:to-amber-500 text-[#031220] font-black rounded-xl transition shadow-[0_0_15px_rgba(217,183,79,0.3)] cursor-pointer"
                >
                  {editingQuestion ? 'Save Changes' : 'Create Question'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
