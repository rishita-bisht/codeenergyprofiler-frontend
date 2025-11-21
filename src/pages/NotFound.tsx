import React from 'react';

// NOTE: We are using a simple Google Font (Monospace) to simulate the retro/pixel feel.

const App = () => {
    // Custom style to load the font and apply to the main container
    const style = {
        fontFamily: "'Press Start 2P', cursive", // Classic arcade font
        backgroundColor: '#0a0a0a', // Deep black background
    };

    return (
        // Load the Arcade font from Google Fonts (external script will handle this)
        <>
            <script src="https://cdn.jsdelivr.net/npm/webfontloader@1.6.28/webfontloader.js"></script>
            {/* The error was in the script tag below. React JSX treats content inside <script> as text, 
                but the compiler expected valid JavaScript object syntax inside the object literal.
                Fix: We use curly braces {} to wrap the script content as a string literal 
                to ensure it's handled correctly as JSX content. However, the best practice in 
                a single file is often to use raw HTML script tags, ensuring JS syntax is correct. 
                The colon error was likely due to misinterpretation of the JS object literal syntax 
                inside the JSX element. We will rely on the external WebFontLoader script's 
                standard behavior and ensure correct JS syntax.
            */}
            <script>
                {`
                    // Correct JavaScript syntax for WebFont.load
                    WebFont.load({
                        google: {
                            families: ['Press Start 2P']
                        }
                    });
                `}
            </script>
            
            <div 
                className="flex min-h-screen items-center justify-center p-4 text-white" 
                style={style}
            >
                {/* Outer Retro Screen/Monitor Border */}
                <div className="border-4 border-lime-400 p-2 shadow-[0_0_20px_rgba(163,230,53,0.8)]">
                    {/* Inner Retro Panel */}
                    <div className="bg-black/90 p-8 sm:p-16 rounded-sm text-center max-w-xl w-full">
                        
                        {/* Error Code - Glitch/Neon Effect */}
                        <h1 
                            className="mb-8 text-7xl sm:text-9xl font-bold tracking-widest text-lime-400 transition-all duration-300"
                            style={{ textShadow: '0 0 10px #a3e635, 0 0 20px #a3e635' }}
                        >
                            404
                        </h1>
                        
                        {/* Title - Pulsing Text */}
                        <p className="mb-6 text-xl sm:text-2xl text-cyan-400 animate-pulse">
                            [ERROR: SYSTEM PATH NOT FOUND]
                        </p>
                        
                        {/* Description */}
                        <p className="mb-10 text-xs sm:text-sm text-gray-300 leading-relaxed">
                            The designated route cannot be accessed. Please initiate return protocol.
                        </p>
                        
                        {/* Action Button - Neon Button Style */}
                        <a 
                            href="/" 
                            className="inline-block px-4 py-3 text-sm font-bold tracking-wider uppercase border-2 border-fuchsia-500 text-fuchsia-500 bg-fuchsia-900/30 transition-all duration-200 
                                shadow-[0_0_15px_rgba(217,70,239,0.7)] hover:text-white hover:bg-fuchsia-500 hover:shadow-[0_0_25px_rgba(217,70,239,1)] active:scale-95"
                            style={{ borderRadius: '0', textShadow: '0 0 5px #c084fc' }}
                        >
                            &lt; GO HOME / REBOOT &gt;
                        </a>
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;