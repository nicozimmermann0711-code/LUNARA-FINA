import React, { useState, useEffect, useRef } from 'react';

// ============================================================================
// MYSTICAL STAR FIELD - Darker, Subtler, More Atmospheric
// ============================================================================
const MysticStarField = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let stars = [];
    let dust = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const init = () => {
      stars = [];
      dust = [];
      
      // Subtle stars
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.5 + 0.1,
          pulse: Math.random() * 0.01 + 0.005,
          phase: Math.random() * Math.PI * 2,
        });
      }
      
      // Floating dust particles
      for (let i = 0; i < 50; i++) {
        dust.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: -Math.random() * 0.2 - 0.1,
          opacity: Math.random() * 0.15 + 0.05,
        });
      }
    };
    
    let time = 0;
    const animate = () => {
      time += 0.01;
      
      // Dark gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      );
      gradient.addColorStop(0, '#0a0a0f');
      gradient.addColorStop(0.5, '#050508');
      gradient.addColorStop(1, '#020204');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars with gentle pulse
      stars.forEach(star => {
        const pulse = Math.sin(time * 2 + star.phase) * 0.3 + 0.7;
        const opacity = star.opacity * pulse;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 140, ${opacity})`;
        ctx.fill();
        
        // Subtle glow
        if (star.size > 1) {
          const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 4);
          glow.addColorStop(0, `rgba(212, 175, 140, ${opacity * 0.3})`);
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.fillRect(star.x - star.size * 4, star.y - star.size * 4, star.size * 8, star.size * 8);
        }
      });
      
      // Draw floating dust
      dust.forEach(d => {
        d.x += d.speedX;
        d.y += d.speedY;
        
        if (d.y < -10) {
          d.y = canvas.height + 10;
          d.x = Math.random() * canvas.width;
        }
        if (d.x < -10) d.x = canvas.width + 10;
        if (d.x > canvas.width + 10) d.x = -10;
        
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 150, 120, ${d.opacity})`;
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    resize();
    init();
    animate();
    
    window.addEventListener('resize', () => { resize(); init(); });
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0 }} />;
};

// ============================================================================
// MYTHIC BUTTON - Elegant, Animated, Cohesive
// ============================================================================
const MythicButton = ({ children, variant = 'primary', onClick, fullWidth, size = 'md', icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };
  
  const sizes = {
    sm: { padding: '12px 28px', fontSize: '12px', letterSpacing: '1.5px' },
    md: { padding: '16px 40px', fontSize: '13px', letterSpacing: '2px' },
    lg: { padding: '20px 56px', fontSize: '14px', letterSpacing: '2.5px' },
  };
  
  const variants = {
    primary: {
      background: isHovered 
        ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(180,150,110,0.25) 0%, rgba(140,110,80,0.15) 50%, rgba(100,80,60,0.1) 100%)`
        : 'linear-gradient(135deg, rgba(140,110,80,0.15) 0%, rgba(100,80,60,0.08) 100%)',
      border: '1px solid rgba(180,150,110,0.3)',
      color: '#c4a882',
      glow: isHovered ? '0 0 40px rgba(180,150,110,0.2), inset 0 0 30px rgba(180,150,110,0.05)' : 'none',
    },
    ghost: {
      background: 'transparent',
      border: '1px solid rgba(180,150,110,0.2)',
      color: 'rgba(180,150,110,0.7)',
      glow: isHovered ? '0 0 30px rgba(180,150,110,0.1)' : 'none',
    },
    accent: {
      background: isHovered
        ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(180,150,110,0.4) 0%, rgba(140,110,80,0.3) 100%)`
        : 'linear-gradient(135deg, rgba(180,150,110,0.3) 0%, rgba(140,110,80,0.2) 100%)',
      border: '1px solid rgba(180,150,110,0.5)',
      color: '#e8dcc8',
      glow: isHovered ? '0 0 50px rgba(180,150,110,0.3), 0 20px 40px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.2)',
    },
  };
  
  const style = variants[variant];
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...sizes[size],
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 500,
        textTransform: 'uppercase',
        borderRadius: '4px',
        cursor: 'pointer',
        width: fullWidth ? '100%' : 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        background: style.background,
        border: style.border,
        color: style.color,
        boxShadow: style.glow,
        transform: isPressed ? 'scale(0.98)' : isHovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {/* Shimmer effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)`,
        backgroundSize: '200% 100%',
        animation: isHovered ? 'shimmer 1.5s ease infinite' : 'none',
        pointerEvents: 'none',
      }} />
      
      {icon && <span style={{ fontSize: '1.1em', opacity: 0.8 }}>{icon}</span>}
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </button>
  );
};

// ============================================================================
// PRODUCT CARD - Mythic Style
// ============================================================================
const MythicProductCard = ({ product, onAdd, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(15,14,18,0.95) 0%, rgba(8,8,12,0.98) 100%)',
        border: '1px solid rgba(180,150,110,0.08)',
        borderRadius: '2px',
        overflow: 'hidden',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 30px 60px rgba(0,0,0,0.5), 0 0 60px rgba(180,150,110,0.08)'
          : '0 10px 40px rgba(0,0,0,0.3)',
        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        animation: `fadeIn 0.8s ease ${delay}s both`,
      }}
    >
      {/* Image Area */}
      <div style={{
        position: 'relative',
        height: '320px',
        background: 'linear-gradient(180deg, rgba(180,150,110,0.03) 0%, transparent 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Product Symbol */}
        <div style={{
          fontSize: '100px',
          opacity: isHovered ? 1 : 0.7,
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 0.6s ease',
          filter: `drop-shadow(0 20px 40px rgba(180,150,110,${isHovered ? 0.3 : 0.1}))`,
        }}>
          {product.symbol}
        </div>
        
        {/* Hover Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent 50%, rgba(8,8,12,0.98) 100%)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.5s ease',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: '25px',
        }}>
          <MythicButton variant="accent" size="sm" onClick={() => onAdd(product)}>
            Hinzufügen
          </MythicButton>
        </div>
        
        {/* Badge */}
        {product.badge && (
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            padding: '6px 16px',
            background: 'rgba(180,150,110,0.15)',
            border: '1px solid rgba(180,150,110,0.3)',
            fontSize: '10px',
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#c4a882',
          }}>
            {product.badge}
          </div>
        )}
      </div>
      
      {/* Info */}
      <div style={{ padding: '28px' }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '22px',
          fontWeight: 500,
          color: '#e8dcc8',
          marginBottom: '8px',
          letterSpacing: '1px',
        }}>
          {product.name}
        </h3>
        <p style={{
          fontSize: '13px',
          color: 'rgba(200,180,160,0.5)',
          marginBottom: '20px',
          lineHeight: 1.6,
        }}>
          {product.description}
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '28px',
            fontWeight: 500,
            color: '#c4a882',
          }}>
            €{product.price}
          </span>
          <span style={{
            fontSize: '11px',
            color: 'rgba(180,150,110,0.5)',
            letterSpacing: '1px',
          }}>
            +{product.points} ✧
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function LunaraMythic() {
  const [phase, setPhase] = useState('intro');
  const [introStep, setIntroStep] = useState(0);
  const [view, setView] = useState('shop');
  const [cart, setCart] = useState([]);
  const [points, setPoints] = useState(500);
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState(null);
  
  // Intro sequence
  useEffect(() => {
    if (phase !== 'intro') return;
    
    const timers = [
      setTimeout(() => setIntroStep(1), 400),
      setTimeout(() => setIntroStep(2), 1200),
      setTimeout(() => setIntroStep(3), 2200),
      setTimeout(() => setIntroStep(4), 3400),
      setTimeout(() => setPhase('app'), 4800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [phase]);
  
  const products = [
    { 
      id: 1, 
      name: 'Midnight Lace Bralette', 
      description: 'Hauchzarte französische Spitze trifft auf verstellbare Satin-Träger. Der tiefe V-Ausschnitt schmeichelt jedem Dekolleté.', 
      price: 59, 
      points: 59, 
      symbol: '🖤', 
      badge: 'Bestseller' 
    },
    { 
      id: 2, 
      name: 'Silk Seduction Negligé', 
      description: 'Fließende Maulbeerseide mit handgestickten Spitzendetails am Saum. Fällt wie ein Traum, fühlt sich an wie eine Umarmung.', 
      price: 129, 
      points: 129, 
      symbol: '✨',
      badge: 'Neu'
    },
    { 
      id: 3, 
      name: 'Venezia Bodysuit', 
      description: 'Italienische Spitze, tiefer Rückenausschnitt, Druckknöpfe im Schritt. Ein Statement-Piece für Frauen, die wissen, was sie wollen.', 
      price: 89, 
      points: 89, 
      symbol: '🌹' 
    },
    { 
      id: 4, 
      name: 'Champagne Dreams Set', 
      description: 'Push-up Balconette-BH mit passender Brazilian-Panty. Champagnerfarbene Seide mit goldener Spitzenborte.', 
      price: 98, 
      points: 98, 
      symbol: '🥂', 
      badge: 'Limitiert' 
    },
    { 
      id: 5, 
      name: 'Noir Satin Kimono', 
      description: 'Bodenlanger Kimono aus schwerem Satin mit Kontrastpaspeln. Die Taille betont durch einen breiten Bindegürtel.', 
      price: 149, 
      points: 149, 
      symbol: '🌙' 
    },
    { 
      id: 6, 
      name: 'Rosé Triangle Bra', 
      description: 'Ungepolstertes Triangel-Design für natürliche Schönheit. Elastische Spitze in zartem Rosé mit Samtschleife.', 
      price: 49, 
      points: 49, 
      symbol: '🎀' 
    },
  ];
  
  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };
  
  const addToCart = (product) => {
    setCart([...cart, product]);
    notify(`${product.name} hinzugefügt`);
  };
  
  const subscribe = () => {
    if (email.includes('@')) {
      setPoints(p => p + 25);
      notify('+25 Punkte erhalten');
      setEmail('');
    }
  };

  // ============================================================================
  // INTRO
  // ============================================================================
  if (phase === 'intro') {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#030305',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <MysticStarField />
        
        {/* Rotating ring */}
        <div style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          border: '1px solid rgba(180,150,110,0.1)',
          borderRadius: '50%',
          opacity: introStep >= 1 ? 1 : 0,
          transform: `scale(${introStep >= 1 ? 1 : 0.5})`,
          transition: 'all 1.2s ease',
          animation: introStep >= 1 ? 'rotate 30s linear infinite' : 'none',
        }} />
        
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          border: '1px solid rgba(180,150,110,0.05)',
          borderRadius: '50%',
          opacity: introStep >= 1 ? 1 : 0,
          transform: `scale(${introStep >= 1 ? 1 : 0.5})`,
          transition: 'all 1.4s ease 0.2s',
          animation: introStep >= 1 ? 'rotateReverse 40s linear infinite' : 'none',
        }} />
        
        {/* Moon */}
        <div style={{
          fontSize: '80px',
          opacity: introStep >= 2 ? 1 : 0,
          transform: `scale(${introStep >= 2 ? 1 : 0.5}) rotate(${introStep >= 2 ? 0 : -30}deg)`,
          transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          filter: 'drop-shadow(0 0 60px rgba(180,150,110,0.4))',
          zIndex: 10,
        }}>
          🌙
        </div>
        
        {/* Title */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '56px',
          fontWeight: 300,
          letterSpacing: '16px',
          color: '#c4a882',
          marginTop: '40px',
          opacity: introStep >= 3 ? 1 : 0,
          transform: `translateY(${introStep >= 3 ? 0 : 30}px)`,
          transition: 'all 1s ease',
          textShadow: '0 0 80px rgba(180,150,110,0.5)',
          zIndex: 10,
        }}>
          LUNARA
        </h1>
        
        {/* Tagline */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '14px',
          letterSpacing: '6px',
          color: 'rgba(180,150,110,0.6)',
          marginTop: '16px',
          textTransform: 'uppercase',
          opacity: introStep >= 3 ? 1 : 0,
          transform: `translateY(${introStep >= 3 ? 0 : 20}px)`,
          transition: 'all 1s ease 0.3s',
          zIndex: 10,
        }}>
          Mystische Eleganz
        </p>
        
        {/* Enter button */}
        <div style={{
          marginTop: '60px',
          opacity: introStep >= 4 ? 1 : 0,
          transform: `translateY(${introStep >= 4 ? 0 : 20}px)`,
          transition: 'all 0.8s ease',
          zIndex: 10,
        }}>
          <MythicButton variant="primary" size="lg" onClick={() => setPhase('app')}>
            Eintreten
          </MythicButton>
        </div>
        
        {/* Progress line */}
        <div style={{
          position: 'absolute',
          bottom: '80px',
          width: '120px',
          height: '1px',
          background: 'rgba(180,150,110,0.1)',
        }}>
          <div style={{
            width: `${(introStep / 4) * 100}%`,
            height: '100%',
            background: 'rgba(180,150,110,0.4)',
            transition: 'width 0.8s ease',
          }} />
        </div>
        
        <style>{`
          @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes rotateReverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        `}</style>
      </div>
    );
  }

  // ============================================================================
  // MAIN APP
  // ============================================================================
  return (
    <div style={{
      minHeight: '100vh',
      background: '#030305',
      color: '#e8dcc8',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <MysticStarField />
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500&display=swap');
        
        @keyframes shimmer {
          0% { background-position: 200% 50%; }
          100% { background-position: -200% 50%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        ::selection {
          background: rgba(180,150,110,0.3);
          color: #e8dcc8;
        }
        
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(180,150,110,0.2); border-radius: 3px; }
      `}</style>
      
      {/* NAVIGATION */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '24px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(180deg, rgba(3,3,5,0.98) 0%, transparent 100%)',
        zIndex: 100,
      }}>
        {/* Logo */}
        <div 
          onClick={() => setPhase('intro')}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '24px',
            fontWeight: 400,
            color: '#c4a882',
            letterSpacing: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ opacity: 0.6 }}>🌙</span>
          LUNARA
        </div>
        
        {/* Nav Links */}
        <div style={{ display: 'flex', gap: '40px' }}>
          {[
            { id: 'shop', label: 'Kollektion' },
            { id: 'account', label: 'Konto' },
            { id: 'cart', label: `Warenkorb${cart.length > 0 ? ` (${cart.length})` : ''}` },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '14px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: view === item.id ? '#c4a882' : 'rgba(200,180,160,0.5)',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                position: 'relative',
              }}
            >
              {item.label}
              {view === item.id && (
                <div style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '4px',
                  height: '4px',
                  background: '#c4a882',
                  borderRadius: '50%',
                }} />
              )}
            </button>
          ))}
        </div>
        
        {/* Points */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 20px',
          border: '1px solid rgba(180,150,110,0.15)',
          borderRadius: '2px',
        }}>
          <span style={{ color: '#c4a882', fontSize: '18px' }}>✧</span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '16px',
            color: '#c4a882',
            letterSpacing: '2px',
          }}>
            {points}
          </span>
        </div>
      </nav>
      
      {/* MAIN CONTENT */}
      <main style={{ 
        paddingTop: '120px', 
        position: 'relative', 
        zIndex: 1,
        minHeight: '100vh',
      }}>
        
        {/* ================================================================ */}
        {/* SHOP VIEW */}
        {/* ================================================================ */}
        {view === 'shop' && (
          <div style={{ padding: '40px 60px', maxWidth: '1400px', margin: '0 auto' }}>
            
            {/* Header */}
            <header style={{ 
              textAlign: 'center', 
              marginBottom: '80px',
              animation: 'fadeIn 1s ease',
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '12px',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: 'rgba(180,150,110,0.5)',
                marginBottom: '16px',
              }}>
                Kollektion 2024
              </p>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '52px',
                fontWeight: 300,
                color: '#e8dcc8',
                letterSpacing: '4px',
                marginBottom: '20px',
              }}>
                Nachtgeflüster
              </h1>
              <p style={{
                fontSize: '15px',
                color: 'rgba(200,180,160,0.6)',
                maxWidth: '500px',
                margin: '0 auto',
                lineHeight: 1.8,
              }}>
                Geheimnisvolle Stücke für Momente zwischen Dämmerung und Morgengrauen
              </p>
            </header>
            
            {/* Products */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '40px',
              marginBottom: '120px',
            }}>
              {products.map((product, i) => (
                <MythicProductCard 
                  key={product.id} 
                  product={product} 
                  onAdd={addToCart}
                  delay={i * 0.1}
                />
              ))}
            </div>
            
            {/* Newsletter */}
            <section style={{
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'center',
              padding: '80px 40px',
              borderTop: '1px solid rgba(180,150,110,0.1)',
              animation: 'fadeIn 1s ease 0.5s both',
            }}>
              <span style={{ 
                fontSize: '32px', 
                display: 'block', 
                marginBottom: '24px',
                animation: 'float 4s ease infinite',
              }}>
                ✉
              </span>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '28px',
                fontWeight: 400,
                color: '#e8dcc8',
                marginBottom: '12px',
                letterSpacing: '2px',
              }}>
                Mondpost
              </h2>
              <p style={{
                fontSize: '14px',
                color: 'rgba(200,180,160,0.5)',
                marginBottom: '32px',
              }}>
                Erhalte exklusive Einblicke und <span style={{ color: '#c4a882' }}>+25 Punkte</span>
              </p>
              
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="deine@email.de"
                  style={{
                    padding: '16px 24px',
                    width: '280px',
                    background: 'rgba(180,150,110,0.05)',
                    border: '1px solid rgba(180,150,110,0.15)',
                    borderRadius: '2px',
                    color: '#e8dcc8',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(180,150,110,0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(180,150,110,0.15)'}
                />
                <MythicButton variant="primary" onClick={subscribe}>
                  Beitreten
                </MythicButton>
              </div>
            </section>
          </div>
        )}
        
        {/* ================================================================ */}
        {/* ACCOUNT VIEW */}
        {/* ================================================================ */}
        {view === 'account' && (
          <div style={{ padding: '40px 60px', maxWidth: '900px', margin: '0 auto' }}>
            
            <header style={{ textAlign: 'center', marginBottom: '60px', animation: 'fadeIn 0.8s ease' }}>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '40px',
                fontWeight: 300,
                letterSpacing: '4px',
                marginBottom: '12px',
              }}>
                Dein Reich
              </h1>
              <p style={{ fontSize: '14px', color: 'rgba(200,180,160,0.5)' }}>
                Eclipse Mitglied seit Januar 2024
              </p>
            </header>
            
            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              marginBottom: '48px',
            }}>
              {[
                { label: 'Punkte', value: points, icon: '✧' },
                { label: 'Status', value: 'Eclipse', icon: '🌓' },
                { label: 'Gespart', value: '€127', icon: '✦' },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: 'linear-gradient(180deg, rgba(15,14,18,0.9) 0%, rgba(8,8,12,0.95) 100%)',
                    border: '1px solid rgba(180,150,110,0.08)',
                    borderRadius: '2px',
                    padding: '32px',
                    textAlign: 'center',
                    animation: `fadeIn 0.8s ease ${i * 0.1}s both`,
                  }}
                >
                  <span style={{ fontSize: '28px', display: 'block', marginBottom: '16px', opacity: 0.7 }}>
                    {stat.icon}
                  </span>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '32px',
                    color: '#c4a882',
                    marginBottom: '8px',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'rgba(200,180,160,0.4)',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Tier Progress */}
            <div style={{
              background: 'linear-gradient(180deg, rgba(15,14,18,0.9) 0%, rgba(8,8,12,0.95) 100%)',
              border: '1px solid rgba(180,150,110,0.08)',
              borderRadius: '2px',
              padding: '40px',
              marginBottom: '48px',
              animation: 'fadeIn 0.8s ease 0.3s both',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                {['Moon', 'Eclipse', 'Nova'].map((tier, i) => (
                  <span key={tier} style={{
                    fontSize: '12px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: i <= 1 ? '#c4a882' : 'rgba(200,180,160,0.3)',
                  }}>
                    {tier}
                  </span>
                ))}
              </div>
              
              <div style={{
                height: '2px',
                background: 'rgba(180,150,110,0.1)',
                borderRadius: '1px',
                marginBottom: '20px',
              }}>
                <div style={{
                  width: `${(points / 1500) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, rgba(180,150,110,0.4), rgba(180,150,110,0.8))',
                  borderRadius: '1px',
                  transition: 'width 1s ease',
                  boxShadow: '0 0 20px rgba(180,150,110,0.3)',
                }} />
              </div>
              
              <p style={{ fontSize: '13px', color: 'rgba(200,180,160,0.5)', textAlign: 'center' }}>
                Noch <span style={{ color: '#c4a882' }}>{1500 - points}</span> Punkte bis Nova
              </p>
            </div>
            
            {/* Activity */}
            <div style={{
              background: 'linear-gradient(180deg, rgba(15,14,18,0.9) 0%, rgba(8,8,12,0.95) 100%)',
              border: '1px solid rgba(180,150,110,0.08)',
              borderRadius: '2px',
              padding: '32px',
              animation: 'fadeIn 0.8s ease 0.4s both',
            }}>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '18px',
                letterSpacing: '2px',
                color: 'rgba(200,180,160,0.6)',
                marginBottom: '24px',
              }}>
                Aktivität
              </h3>
              
              {[
                { action: 'Bestellung abgeschlossen', points: '+198', date: 'Heute' },
                { action: 'Newsletter Bonus', points: '+25', date: 'Gestern' },
                { action: 'Punkte eingelöst', points: '-200', date: '28. Jan' },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '16px 0',
                    borderBottom: i < 2 ? '1px solid rgba(180,150,110,0.05)' : 'none',
                    animation: `slideIn 0.5s ease ${0.5 + i * 0.1}s both`,
                  }}
                >
                  <div>
                    <div style={{ fontSize: '14px', marginBottom: '4px' }}>{item.action}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(200,180,160,0.4)' }}>{item.date}</div>
                  </div>
                  <span style={{
                    color: item.points.startsWith('+') ? '#7cb882' : '#c48282',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '16px',
                  }}>
                    {item.points}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* ================================================================ */}
        {/* CART VIEW */}
        {/* ================================================================ */}
        {view === 'cart' && (
          <div style={{ padding: '40px 60px', maxWidth: '800px', margin: '0 auto' }}>
            
            <header style={{ textAlign: 'center', marginBottom: '60px', animation: 'fadeIn 0.8s ease' }}>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '40px',
                fontWeight: 300,
                letterSpacing: '4px',
              }}>
                Warenkorb
              </h1>
            </header>
            
            {cart.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 40px',
                animation: 'fadeIn 0.8s ease',
              }}>
                <span style={{ fontSize: '48px', display: 'block', marginBottom: '24px', opacity: 0.3 }}>
                  ✧
                </span>
                <p style={{ fontSize: '16px', color: 'rgba(200,180,160,0.5)', marginBottom: '32px' }}>
                  Dein Warenkorb ist leer
                </p>
                <MythicButton variant="primary" onClick={() => setView('shop')}>
                  Kollektion entdecken
                </MythicButton>
              </div>
            ) : (
              <>
                {/* Items */}
                <div style={{
                  background: 'linear-gradient(180deg, rgba(15,14,18,0.9) 0%, rgba(8,8,12,0.95) 100%)',
                  border: '1px solid rgba(180,150,110,0.08)',
                  borderRadius: '2px',
                  marginBottom: '32px',
                  animation: 'fadeIn 0.8s ease',
                }}>
                  {cart.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '28px 32px',
                        borderBottom: i < cart.length - 1 ? '1px solid rgba(180,150,110,0.05)' : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <span style={{ fontSize: '32px' }}>{item.symbol}</span>
                        <div>
                          <div style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: '18px',
                            marginBottom: '4px',
                          }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: '12px', color: 'rgba(200,180,160,0.4)' }}>
                            {item.description}
                          </div>
                        </div>
                      </div>
                      <span style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '20px',
                        color: '#c4a882',
                      }}>
                        €{item.price}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Summary */}
                <div style={{
                  background: 'linear-gradient(180deg, rgba(15,14,18,0.9) 0%, rgba(8,8,12,0.95) 100%)',
                  border: '1px solid rgba(180,150,110,0.08)',
                  borderRadius: '2px',
                  padding: '32px',
                  animation: 'fadeIn 0.8s ease 0.2s both',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                    fontSize: '14px',
                  }}>
                    <span style={{ color: 'rgba(200,180,160,0.5)' }}>Zwischensumme</span>
                    <span>€{cart.reduce((s, i) => s + i.price, 0)}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '24px',
                    fontSize: '14px',
                  }}>
                    <span style={{ color: 'rgba(200,180,160,0.5)' }}>Versand</span>
                    <span style={{ color: '#7cb882' }}>Kostenlos</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '24px',
                    borderTop: '1px solid rgba(180,150,110,0.1)',
                  }}>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '20px',
                    }}>
                      Gesamt
                    </span>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '24px',
                      color: '#c4a882',
                    }}>
                      €{cart.reduce((s, i) => s + i.price, 0)}
                    </span>
                  </div>
                  
                  <div style={{
                    marginTop: '20px',
                    padding: '12px',
                    background: 'rgba(180,150,110,0.05)',
                    borderRadius: '2px',
                    textAlign: 'center',
                    fontSize: '13px',
                    color: 'rgba(200,180,160,0.6)',
                  }}>
                    Du erhältst <span style={{ color: '#c4a882' }}>+{cart.reduce((s, i) => s + i.points, 0)}</span> Punkte
                  </div>
                  
                  <div style={{ marginTop: '28px' }}>
                    <MythicButton variant="accent" fullWidth size="lg">
                      Zur Kasse
                    </MythicButton>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </main>
      
      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '16px 32px',
          background: 'rgba(15,14,18,0.98)',
          border: '1px solid rgba(180,150,110,0.2)',
          borderRadius: '2px',
          fontSize: '14px',
          color: '#c4a882',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          animation: 'fadeIn 0.4s ease',
          zIndex: 1000,
        }}>
          {notification}
        </div>
      )}
    </div>
  );
}
