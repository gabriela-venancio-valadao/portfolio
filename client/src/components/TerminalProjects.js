import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import '../styles/TerminalProjects.css';

const TerminalProjects = ({ projects }) => {
  const [terminalLines, setTerminalLines] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCursor, setShowCursor] = useState(true);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor(prev => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  // Auto scroll terminal
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalLines, selectedProject]);

  // Boot sequence when visible
  useEffect(() => {
    if (inView && terminalLines.length === 0) {
      const bootSequence = [
        { type: 'system', text: '██████╗ ██████╗  ██████╗      ██╗███████╗ ██████╗████████╗███████╗' },
        { type: 'system', text: '██╔══██╗██╔══██╗██╔═══██╗     ██║██╔════╝██╔════╝╚══██╔══╝██╔════╝' },
        { type: 'system', text: '██████╔╝██████╔╝██║   ██║     ██║█████╗  ██║        ██║   ███████╗' },
        { type: 'system', text: '██╔═══╝ ██╔══██╗██║   ██║██   ██║██╔══╝  ██║        ██║   ╚════██║' },
        { type: 'system', text: '██║     ██║  ██║╚██████╔╝╚█████╔╝███████╗╚██████╗   ██║   ███████║' },
        { type: 'system', text: '╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝   ╚══════╝' },
        { type: 'info', text: '' },
        { type: 'info', text: '🐧 Portfolio Terminal v2.0.26 — Linux 6.1.0-arch1' },
        { type: 'success', text: '✓ Kernel loaded. Session initialized.' },
        { type: 'info', text: '' },
        { type: 'warning', text: 'Digite "help" para ver os comandos disponíveis.' },
        { type: 'warning', text: 'Digite "ls" para listar todos os projetos.' },
        { type: 'info', text: '' },
      ];

      let delay = 0;
      bootSequence.forEach((line, i) => {
        delay += i < 6 ? 60 : 120;
        setTimeout(() => {
          setTerminalLines(prev => [...prev, line]);
        }, delay);
      });
    }
  }, [inView, terminalLines.length]);

  const getTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'fullstack': return 'terminal-cyan';
      case 'frontend': return 'terminal-green';
      case 'backend': return 'terminal-yellow';
      default: return 'terminal-white';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'fullstack': return 'FULLSTACK';
      case 'frontend': return 'FRONTEND';
      case 'backend': return 'BACKEND';
      default: return 'OTHER';
    }
  };

  const processCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const parts = trimmed.split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1);

    const newLines = [
      { type: 'command', text: cmd, timestamp: getTimestamp() }
    ];

    switch (command) {
      case 'help':
        newLines.push(
          { type: 'info', text: '' },
          { type: 'title', text: '╭─────────────────────────────────────────────────╮' },
          { type: 'title', text: '│           📖 COMANDOS DISPONÍVEIS                │' },
          { type: 'title', text: '╰─────────────────────────────────────────────────╯' },
          { type: 'info', text: '' },
          { type: 'help-cmd', text: '  ls                    ', desc: 'Lista todos os projetos' },
          { type: 'help-cmd', text: '  ls --featured         ', desc: 'Lista projetos em destaque' },
          { type: 'help-cmd', text: '  ls --category <tipo>  ', desc: 'Filtra por: fullstack, frontend, backend' },
          { type: 'help-cmd', text: '  cat <id>              ', desc: 'Mostra detalhes de um projeto' },
          { type: 'help-cmd', text: '  open <id>             ', desc: 'Abre links do projeto' },
          { type: 'help-cmd', text: '  grep <texto>          ', desc: 'Busca projetos por tecnologia ou nome' },
          { type: 'help-cmd', text: '  neofetch              ', desc: 'Exibe informações do sistema' },
          { type: 'help-cmd', text: '  tree                  ', desc: 'Mostra estrutura dos projetos' },
          { type: 'help-cmd', text: '  clear                 ', desc: 'Limpa o terminal' },
          { type: 'help-cmd', text: '  whoami                ', desc: 'Quem sou eu?' },
          { type: 'info', text: '' },
        );
        break;

      case 'ls':
        const flag = args[0];
        let filtered = [...projects];

        if (flag === '--featured') {
          filtered = projects.filter(p => p.featured);
          newLines.push({ type: 'info', text: `\n  📌 Projetos em destaque (${filtered.length} encontrados):` });
        } else if (flag === '--category' && args[1]) {
          filtered = projects.filter(p => p.category === args[1]);
          newLines.push({ type: 'info', text: `\n  🔍 Projetos [${args[1]}] (${filtered.length} encontrados):` });
        } else {
          newLines.push({ type: 'info', text: `\n  📂 ~/projects/ — ${filtered.length} projetos encontrados:` });
        }

        newLines.push({ type: 'info', text: '' });
        newLines.push({
          type: 'table-header',
          text: '  ID   │ NOME                      │ CATEGORIA   │ STATUS'
        });
        newLines.push({
          type: 'table-divider',
          text: '  ─────┼───────────────────────────┼─────────────┼────────'
        });

        filtered.forEach(p => {
          const id = String(p.id).padEnd(4);
          const name = p.title.padEnd(25).substring(0, 25);
          const cat = getCategoryLabel(p.category).padEnd(11);
          const status = p.featured ? '★ DESTAQUE' : '  ativo';
          newLines.push({
            type: 'table-row',
            text: `  ${id} │ ${name} │ ${cat} │ ${status}`,
            projectId: p.id,
            category: p.category,
            featured: p.featured,
          });
        });

        newLines.push({ type: 'info', text: '' });
        newLines.push({ type: 'muted', text: '  💡 Use "cat <id>" para ver detalhes de um projeto.' });
        newLines.push({ type: 'info', text: '' });
        break;

      case 'cat':
        const projectId = parseInt(args[0]);
        const project = projects.find(p => p.id === projectId);

        if (!project) {
          newLines.push({ type: 'error', text: `  ✗ Erro: projeto com id "${args[0] || '?'}" não encontrado.` });
          newLines.push({ type: 'muted', text: '  Use "ls" para listar os projetos disponíveis.' });
          break;
        }

        setSelectedProject(project);

        newLines.push(
          { type: 'info', text: '' },
          { type: 'title', text: `  ╭${'─'.repeat(50)}╮` },
          { type: 'title', text: `  │  ${project.image}  ${project.title.padEnd(44).substring(0, 44)} │` },
          { type: 'title', text: `  ╰${'─'.repeat(50)}╯` },
          { type: 'info', text: '' },
          { type: 'label', text: '  📋 Descrição:' },
          { type: 'description', text: `     ${project.longDescription}` },
          { type: 'info', text: '' },
          { type: 'label', text: '  🏷️  Categoria:' },
          { type: getCategoryColor(project.category), text: `     [${getCategoryLabel(project.category)}]${project.featured ? '  ★ DESTAQUE' : ''}` },
          { type: 'info', text: '' },
          { type: 'label', text: '  🛠️  Stack:' },
          { type: 'tech-list', text: `     ${project.technologies.map(t => `【${t}】`).join(' ')}` },
          { type: 'info', text: '' },
          { type: 'label', text: '  🔗 Links:' },
        );

        if (project.github) {
          newLines.push({ type: 'link', text: `     ├── GitHub:  ${project.github}`, url: project.github });
        }
        if (project.live) {
          newLines.push({ type: 'link', text: `     └── Demo:    ${project.live}`, url: project.live });
        }
        if (!project.github && !project.live) {
          newLines.push({ type: 'muted', text: '     └── Nenhum link disponível' });
        }

        newLines.push({ type: 'info', text: '' });
        break;

      case 'open':
        const openId = parseInt(args[0]);
        const openProject = projects.find(p => p.id === openId);

        if (!openProject) {
          newLines.push({ type: 'error', text: `  ✗ Erro: projeto "${args[0] || '?'}" não encontrado.` });
          break;
        }

        if (openProject.live) {
          window.open(openProject.live, '_blank');
          newLines.push({ type: 'success', text: `  ✓ Abrindo demo: ${openProject.live}` });
        } else if (openProject.github) {
          window.open(openProject.github, '_blank');
          newLines.push({ type: 'success', text: `  ✓ Abrindo GitHub: ${openProject.github}` });
        } else {
          newLines.push({ type: 'warning', text: '  ⚠ Nenhum link disponível para este projeto.' });
        }
        break;

      case 'grep':
        const search = args.join(' ');
        if (!search) {
          newLines.push({ type: 'error', text: '  ✗ Uso: grep <termo de busca>' });
          break;
        }

        const results = projects.filter(p =>
          p.title.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          p.technologies.some(t => t.toLowerCase().includes(search))
        );

        if (results.length === 0) {
          newLines.push({ type: 'warning', text: `  ⚠ Nenhum resultado para "${search}".` });
        } else {
          newLines.push({ type: 'success', text: `  ✓ ${results.length} resultado(s) para "${search}":` });
          newLines.push({ type: 'info', text: '' });
          results.forEach(p => {
            newLines.push({
              type: 'search-result',
              text: `  [${p.id}] ${p.image} ${p.title}`,
              subtext: `      Techs: ${p.technologies.join(', ')}`,
              projectId: p.id,
            });
          });
        }
        newLines.push({ type: 'info', text: '' });
        break;

      case 'tree':
        newLines.push(
          { type: 'info', text: '' },
          { type: 'success', text: '  ~/projects/' },
        );

        projects.forEach((p, i) => {
          const isLast = i === projects.length - 1;
          const prefix = isLast ? '  └──' : '  ├──';
          const subPrefix = isLast ? '      ' : '  │   ';
          newLines.push(
            { type: 'tree-item', text: `${prefix} 📁 ${p.title}/`, projectId: p.id },
            { type: 'muted', text: `${subPrefix} ├── README.md` },
            { type: 'muted', text: `${subPrefix} ├── package.json` },
            { type: 'tech-list', text: `${subPrefix} └── stack: [${p.technologies.slice(0, 3).join(', ')}${p.technologies.length > 3 ? ', ...' : ''}]` },
          );
        });

        newLines.push(
          { type: 'info', text: '' },
          { type: 'muted', text: `  ${projects.length} diretórios` },
          { type: 'info', text: '' },
        );
        break;

      case 'neofetch':
        newLines.push(
          { type: 'info', text: '' },
          { type: 'neofetch-art', text: '        .-/+oossssoo+/-.          ' },
          { type: 'neofetch-art', text: '    `:+ssssssssssssssssss+:`      ' },
          { type: 'neofetch-art', text: '  -+ssssssssssssssssssyyssss+-    ' },
          { type: 'neofetch-art', text: ' .osssssssssssssssssssdMMMNysssso.  ' },
          { type: 'neofetch-art', text: '/ssssssssssshdmmNNmmyNMMMMhssssss/ ' },
          { type: 'neofetch-art', text: '+ssssssssshmydMMMMMMMNddddyssssss+ ' },
          { type: 'neofetch-art', text: '/sssssssshNMMMyhhyyyyhmNMMMNhssssss/' },
          { type: 'neofetch-art', text: '.ssssssssdMMMNhsssssssssshNMMMdssssss.' },
          { type: 'neofetch-art', text: '+sssshhhyNMMNyssssssssssssyNMMMysssss+' },
          { type: 'neofetch-art', text: 'ossyNMMMNyMMhsssssssssssssshmmmhssssso' },
          { type: 'neofetch-art', text: 'ossyNMMMNyMMhsssssssssssssshmmmhssssso' },
          { type: 'neofetch-art', text: '+sssshhhyNMMNyssssssssssssyNMMMysssss+' },
          { type: 'neofetch-art', text: '.ssssssssdMMMNhsssssssssshNMMMdssssss.' },
          { type: 'neofetch-art', text: ' /sssssssshNMMMyhhyyyyhdNMMMNhssssss/' },
          { type: 'neofetch-art', text: '  +sssssssssdmydMMMMMMMMddddyssssss+' },
          { type: 'neofetch-art', text: '   /ssssssssssshdmNNNNmyNMMMMhssssss/' },
          { type: 'neofetch-art', text: '    .ossssssssssssssssssdMMMNysssso.' },
          { type: 'neofetch-art', text: '      -+sssssssssssssssssyyyssss+-' },
          { type: 'neofetch-art', text: '        `:+ssssssssssssssssss+:`' },
          { type: 'neofetch-art', text: '            .-/+oossssoo+/-.' },
          { type: 'info', text: '' },
          { type: 'neofetch-label', text: '  dev@portfolio', value: '' },
          { type: 'neofetch-divider', text: '  ─────────────────────────' },
          { type: 'neofetch-label', text: '  OS', value: 'Portfolio Linux x86_64' },
          { type: 'neofetch-label', text: '  Kernel', value: '6.1.0-dev' },
          { type: 'neofetch-label', text: '  Shell', value: 'portfolio-sh 2.0' },
          { type: 'neofetch-label', text: '  Projetos', value: `${projects.length} repositórios` },
          { type: 'neofetch-label', text: '  Featured', value: `${projects.filter(p => p.featured).length} destaques` },
          { type: 'neofetch-label', text: '  Stack', value: `${[...new Set(projects.flatMap(p => p.technologies))].length} tecnologias` },
          { type: 'neofetch-label', text: '  Uptime', value: 'Sempre online ∞' },
          { type: 'neofetch-label', text: '  Terminal', value: 'portfolio-terminal' },
          { type: 'info', text: '' },
          { type: 'neofetch-colors', text: '  ██████████████████████████████' },
          { type: 'info', text: '' },
        );
        break;

      case 'whoami':
        newLines.push(
          { type: 'info', text: '' },
          { type: 'success', text: '  Desenvolvedor Full Stack 🚀' },
          { type: 'muted', text: '  Apaixonado por código, café e soluções criativas.' },
          { type: 'info', text: '' },
        );
        break;

      case 'clear':
        setTerminalLines([]);
        setSelectedProject(null);
        return;

      case '':
        break;

      default:
        newLines.push(
          { type: 'error', text: `  bash: ${command}: comando não encontrado` },
          { type: 'muted', text: '  Digite "help" para ver os comandos disponíveis.' },
        );
    }

    setTerminalLines(prev => [...prev, ...newLines]);
    setHistory(prev => cmd.trim() ? [cmd.trim(), ...prev] : prev);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      processCommand(currentCommand);
      setCurrentCommand('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = ['help', 'ls', 'cat', 'open', 'grep', 'tree', 'neofetch', 'clear', 'whoami'];
      const match = commands.find(c => c.startsWith(currentCommand.toLowerCase()));
      if (match) setCurrentCommand(match);
    }
  };

  const handleQuickCommand = (cmd) => {
    processCommand(cmd);
    setCurrentCommand('');
    if (inputRef.current) inputRef.current.focus();
  };

  const renderLine = (line, index) => {
    switch (line.type) {
      case 'command':
        return (
          <div key={index} className="term-line term-command-line">
            <span className="term-prompt">
              <span className="term-user">dev</span>
              <span className="term-at">@</span>
              <span className="term-host">portfolio</span>
              <span className="term-colon">:</span>
              <span className="term-path">~/projects</span>
              <span className="term-dollar">$</span>
            </span>
            <span className="term-cmd-text">{line.text}</span>
            {line.timestamp && <span className="term-timestamp">{line.timestamp}</span>}
          </div>
        );
      case 'system':
        return <div key={index} className="term-line term-system">{line.text}</div>;
      case 'info':
        return <div key={index} className="term-line term-info">{line.text || '\u00A0'}</div>;
      case 'success':
        return <div key={index} className="term-line term-success">{line.text}</div>;
      case 'error':
        return <div key={index} className="term-line term-error">{line.text}</div>;
      case 'warning':
        return <div key={index} className="term-line term-warning">{line.text}</div>;
      case 'muted':
        return <div key={index} className="term-line term-muted">{line.text}</div>;
      case 'title':
        return <div key={index} className="term-line term-title">{line.text}</div>;
      case 'label':
        return <div key={index} className="term-line term-label">{line.text}</div>;
      case 'description':
        return <div key={index} className="term-line term-description">{line.text}</div>;
      case 'link':
        return (
          <div key={index} className="term-line term-link" onClick={() => line.url && window.open(line.url, '_blank')}>
            {line.text}
            <span className="term-link-icon"> ↗</span>
          </div>
        );
      case 'help-cmd':
        return (
          <div key={index} className="term-line term-help">
            <span className="term-help-cmd">{line.text}</span>
            <span className="term-help-desc">{line.desc}</span>
          </div>
        );
      case 'table-header':
        return <div key={index} className="term-line term-table-header">{line.text}</div>;
      case 'table-divider':
        return <div key={index} className="term-line term-table-divider">{line.text}</div>;
      case 'table-row':
        return (
          <div
            key={index}
            className={`term-line term-table-row ${line.featured ? 'term-featured' : ''}`}
            onClick={() => handleQuickCommand(`cat ${line.projectId}`)}
          >
            {line.text}
          </div>
        );
      case 'tree-item':
        return (
          <div
            key={index}
            className="term-line term-tree-item"
            onClick={() => handleQuickCommand(`cat ${line.projectId}`)}
          >
            {line.text}
          </div>
        );
      case 'search-result':
        return (
          <div key={index} className="term-search-result" onClick={() => handleQuickCommand(`cat ${line.projectId}`)}>
            <div className="term-line term-success">{line.text}</div>
            <div className="term-line term-muted">{line.subtext}</div>
          </div>
        );
      case 'tech-list':
        return <div key={index} className="term-line term-tech">{line.text}</div>;
      case 'terminal-cyan':
        return <div key={index} className="term-line term-cyan">{line.text}</div>;
      case 'terminal-green':
        return <div key={index} className="term-line term-green">{line.text}</div>;
      case 'terminal-yellow':
        return <div key={index} className="term-line term-yellow">{line.text}</div>;
      case 'terminal-white':
        return <div key={index} className="term-line term-white">{line.text}</div>;
      case 'neofetch-art':
        return <div key={index} className="term-line term-neofetch-art">{line.text}</div>;
      case 'neofetch-label':
        return (
          <div key={index} className="term-line term-neofetch-label">
            <span className="neo-key">{line.text}</span>
            {line.value && <span className="neo-value">: {line.value}</span>}
          </div>
        );
      case 'neofetch-divider':
        return <div key={index} className="term-line term-neofetch-divider">{line.text}</div>;
      case 'neofetch-colors':
        return <div key={index} className="term-line term-neofetch-colors">{line.text}</div>;
      default:
        return <div key={index} className="term-line">{line.text}</div>;
    }
  };

  return (
    <section id="terminal" className="terminal-projects" ref={ref}>
      <div className={`section-container ${inView ? 'animate-in' : ''}`}>
        <div className="section-header">
          <span className="section-icon">🐧</span>
          <h2 className="section-title">Terminal</h2>
          <p className="section-subtitle">// Explore projetos como um hacker de verdade</p>
          <div className="title-decoration">
            <span className="deco-leaf">{'<'}</span>
            <div className="decoration-line"></div>
            <span className="deco-leaf">{'/>'}</span>
          </div>
        </div>

        {/* Quick Commands */}
        <div className="terminal-quick-cmds">
          {['help', 'ls', 'ls --featured', 'tree', 'neofetch', 'clear'].map(cmd => (
            <button key={cmd} className="quick-cmd-btn" onClick={() => handleQuickCommand(cmd)}>
              <span className="quick-dollar">$</span> {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Window */}
        <div className="terminal-window">
          {/* Title Bar */}
          <div className="terminal-titlebar">
            <div className="terminal-buttons">
              <span className="term-btn term-btn-close"></span>
              <span className="term-btn term-btn-minimize"></span>
              <span className="term-btn term-btn-maximize"></span>
            </div>
            <div className="terminal-title-text">
              dev@portfolio: ~/projects
            </div>
            <div className="terminal-titlebar-right">
              <span className="terminal-tab active">bash</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div
            className="terminal-body"
            ref={terminalBodyRef}
            onClick={() => inputRef.current && inputRef.current.focus()}
          >
            {terminalLines.map((line, index) => renderLine(line, index))}

            {/* Input Line */}
            <div className="term-input-line">
              <span className="term-prompt">
                <span className="term-user">dev</span>
                <span className="term-at">@</span>
                <span className="term-host">portfolio</span>
                <span className="term-colon">:</span>
                <span className="term-path">~/projects</span>
                <span className="term-dollar">$</span>
              </span>
              <div className="term-input-wrapper">
                <input
                  ref={inputRef}
                  type="text"
                  className="term-input"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                />
                <span className={`term-cursor ${showCursor ? 'visible' : ''}`}>▊</span>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="terminal-statusbar">
            <div className="statusbar-left">
              <span className="status-item">🐧 bash</span>
              <span className="status-item">UTF-8</span>
            </div>
            <div className="statusbar-right">
              <span className="status-item">{projects.length} projetos</span>
              <span className="status-item status-online">● online</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerminalProjects;
