import React from 'react';

interface PreviewProps {
  sketchCode: string;
  logs: string[];
}

const Preview: React.FC<PreviewProps> = ({ sketchCode, logs }) => {
  // Simple simulation of sketch execution in iframe
  const srcDoc = `
    <html>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.js"></script>
        <style>
          body { margin: 0; padding: 0; background: #222; overflow: hidden; }
          canvas { display: block; margin: auto; }
        </style>
      </head>
      <body>
        <script>
          try {
            // Error handling for the sketch
            window.onerror = function(msg, url, lineNo, columnNo, error) {
              window.parent.postMessage({ type: 'error', message: msg }, '*');
              return false;
            };

            // Execute the user's code
            ${sketchCode}
            
            // If no setup is defined, show a placeholder
            if (typeof setup === 'undefined' && typeof draw === 'undefined') {
               const p = document.createElement('div');
               p.style.color = 'white';
               p.style.textAlign = 'center';
               p.style.marginTop = '20%';
               p.innerText = 'Sketch Executing (No setup/draw found)';
               document.body.appendChild(p);
            }
          } catch (e) {
            window.parent.postMessage({ type: 'error', message: e.message }, '*');
          }
        </script>
      </body>
    </html>
  `;

  return (
    <div className="preview-container-p5">
      <div className="iframe-wrapper-p5">
        <iframe
          title="sketch preview"
          data-testid="sketch-preview"
          srcDoc={srcDoc}
          sandbox="allow-scripts"
        />
      </div>
      <div className="console-container-p5" data-testid="console-output">
        <div className="console-header-p5">
          <span>Console</span>
          <div className="console-actions-p5">
             <button className="btn-clear-p5">Clear</button>
             <span>▾</span>
          </div>
        </div>
        <div className="console-logs-p5">
          {logs.map((log, i) => (
            <div key={i} className="log-entry-p5">{log}</div>
          ))}
          {logs.length === 0 && <div className="log-placeholder-p5"></div>}
        </div>
      </div>
    </div>
  );
};

export default Preview;
