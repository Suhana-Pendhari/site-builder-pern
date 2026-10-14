import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Save, Download, Monitor, Smartphone, RefreshCw, X, Send, Code, Eye, FileText } from 'lucide-react';
import LoaderSteps from '../components/LoaderSteps';

interface GeneratedCode {
  html: string;
  css: string;
  javascript: string;
}

const Builder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialPrompt = location.state?.prompt || '';
  const urlProjectId = location.pathname.split('/').pop();

  const [prompt, setPrompt] = useState(initialPrompt);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeCodeTab, setActiveCodeTab] = useState<'html' | 'css' | 'javascript'>('html');
  const [saveStatus, setSaveStatus] = useState<'unsaved' | 'saving' | 'saved'>('unsaved');
  const [error, setError] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<number | null>(null);
  const [loadingProject, setLoadingProject] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (urlProjectId && urlProjectId !== 'new') {
      loadProject(parseInt(urlProjectId));
    } else if (initialPrompt) {
      handleGenerate(initialPrompt);
    }
  }, [urlProjectId, initialPrompt]);

  const loadProject = async (id: number) => {
    setLoadingProject(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/projects/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load project');
      }

      const project = data.project;
      setProjectId(project.id);
      setPrompt(project.original_prompt);
      setMessages([{ role: 'user', content: project.original_prompt }]);
      
      if (project.html && project.css) {
        setGeneratedCode({
          html: project.html,
          css: project.css,
          javascript: project.javascript || ''
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load project';
      setError(errorMessage);
    } finally {
      setLoadingProject(false);
    }
  };

  const handleGenerate = async (userPrompt?: string) => {
    const promptToSend = userPrompt || prompt;
    if (!promptToSend.trim()) return;

    setIsGenerating(true);
    setError(null);
    setMessages(prev => [...prev, { role: 'user', content: promptToSend }]);

    try {
      const response = await fetch(`${API_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend,
          existingCode: generatedCode
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate website');
      }

      setGeneratedCode({
        html: data.html,
        css: data.css,
        javascript: data.javascript
      });

      setMessages(prev => [...prev, { role: 'assistant', content: 'Website generated successfully!' }]);
      setSaveStatus('unsaved');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate website';
      setError(errorMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${errorMessage}` }]);
    } finally {
      setIsGenerating(false);
      if (!userPrompt) setPrompt('');
    }
  };

  const handleSave = async () => {
    if (!generatedCode) return;

    setSaveStatus('saving');
    setError(null);

    try {
      const projectData = {
        name: `Project ${new Date().toLocaleDateString()}`,
        prompt: messages.find(m => m.role === 'user')?.content || prompt,
        html: generatedCode.html,
        css: generatedCode.css,
        javascript: generatedCode.javascript
      };

      const url = projectId 
        ? `${API_URL}/api/projects/${projectId}`
        : `${API_URL}/api/projects`;
      
      const method = projectId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save project');
      }

      if (!projectId && data.project?.id) {
        setProjectId(data.project.id);
      }

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('unsaved'), 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save project';
      setError(errorMessage);
      setSaveStatus('unsaved');
    }
  };

  const handleExport = () => {
    if (!generatedCode) return;

    const files = [
      { name: 'index.html', content: generatedCode.html },
      { name: 'styles.css', content: generatedCode.css },
      { name: 'script.js', content: generatedCode.javascript }
    ];

    files.forEach(file => {
      const blob = new Blob([file.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  if (isGenerating || loadingProject) {
    return <LoaderSteps />;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-950 text-white">
      {/* Top navigation */}
      <header className="h-16 border-b border-gray-800 flex items-center justify-between px-4 bg-gray-900">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:text-violet-400 transition"
          >
            <Sparkles className="w-5 h-5 text-violet-400" />
            <span className="font-semibold">SiteSpark AI</span>
          </button>
          <div className="h-6 w-px bg-gray-700" />
          <span className="text-sm text-gray-400">
            {projectId ? `Project #${projectId}` : 'New Project'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* View mode toggle */}
          <div className="flex items-center bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('preview')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition ${
                viewMode === 'preview' ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition ${
                viewMode === 'code' ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Code className="w-4 h-4" />
              Code
            </button>
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={!generatedCode || saveStatus === 'saving'}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : 'Save'}
          </button>

          {/* Export button */}
          <button
            onClick={handleExport}
            disabled={!generatedCode}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left panel - Prompt & History */}
        <aside className="w-80 border-r border-gray-800 flex flex-col bg-gray-900">
          <div className="p-4 border-b border-gray-800">
            <h2 className="font-semibold mb-2">Conversation</h2>
            <div className="flex-1 overflow-y-auto max-h-48 space-y-2 mb-4">
              {messages.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  Start by describing your website
                </p>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg text-sm ${
                    msg.role === 'user'
                      ? 'bg-violet-600/20 text-violet-200'
                      : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  <span className="font-medium block mb-1">
                    {msg.role === 'user' ? 'You' : 'AI'}
                  </span>
                  {msg.content}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 flex-1 flex flex-col">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe changes you want to make..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm resize-none outline-none focus:border-violet-500 transition"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleGenerate();
                }
              }}
            />
            <button
              onClick={() => handleGenerate()}
              disabled={!prompt.trim() || isGenerating}
              className="mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-gray-700 disabled:to-gray-700 text-white px-4 py-2 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              Generate
            </button>
          </div>
        </aside>

        {/* Main panel - Preview or Code */}
        <main className="flex-1 flex flex-col bg-gray-950">
          {viewMode === 'preview' ? (
            <>
              {/* Device toggle */}
              <div className="h-12 border-b border-gray-800 flex items-center justify-between px-4 bg-gray-900">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDeviceMode('desktop')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition ${
                      deviceMode === 'desktop' ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                    Desktop
                  </button>
                  <button
                    onClick={() => setDeviceMode('mobile')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition ${
                      deviceMode === 'mobile' ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    Mobile
                  </button>
                </div>
                <button
                  onClick={() => generatedCode && setGeneratedCode({ ...generatedCode })}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>

              {/* Preview iframe */}
              <div className="flex-1 p-4 flex items-center justify-center bg-gray-950">
                {generatedCode ? (
                  <div
                    className={`bg-white rounded-lg overflow-hidden shadow-2xl ${
                      deviceMode === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full h-full'
                    }`}
                  >
                    <iframe
                      srcDoc={`
                        <!DOCTYPE html>
                        <html>
                        <head>
                          <style>${generatedCode.css}</style>
                        </head>
                        <body>
                          ${generatedCode.html}
                          <script>${generatedCode.javascript}</script>
                        </body>
                        </html>
                      `}
                      title="Website Preview"
                      className="w-full h-full border-0"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-500">No website generated yet</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Enter a prompt in the left panel to get started
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Code tabs */}
              <div className="h-12 border-b border-gray-800 flex items-center px-4 bg-gray-900 gap-2">
                {(['html', 'css', 'javascript'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCodeTab(tab)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                      activeCodeTab === tab
                        ? 'bg-violet-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
                {generatedCode && (
                  <button
                    onClick={() => copyCode(generatedCode[activeCodeTab])}
                    className="ml-auto text-gray-400 hover:text-white transition text-sm"
                  >
                    Copy
                  </button>
                )}
              </div>

              {/* Code viewer */}
              <div className="flex-1 p-4 bg-gray-950 overflow-auto">
                {generatedCode ? (
                  <pre className="bg-gray-900 rounded-lg p-4 text-sm text-gray-300 overflow-auto font-mono">
                    <code>{generatedCode[activeCodeTab]}</code>
                  </pre>
                ) : (
                  <div className="text-center py-20">
                    <Code className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-500">No code generated yet</p>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>

      {/* Error notification */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-900/90 border border-red-700 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-md">
          <X className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
          <button
            onClick={() => setError(null)}
            className="ml-auto hover:bg-red-800 rounded p-1 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Builder;
