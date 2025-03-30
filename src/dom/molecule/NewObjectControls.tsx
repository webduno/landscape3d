"use client"
import { Dispatch, SetStateAction, useEffect } from 'react'
import { GameButton } from '../atom/game/GameButton';

type TransformMode = 'move' | 'scale' | 'rotate';

interface NewObjectControlsProps {
  transformMode: TransformMode;
  cycleTransformMode: () => void;
  handleDone: () => void;
  handleCancel: () => void;
  color: string;
  setColor: (color: string) => void;
  setTransformMode: (mode: TransformMode) => void;
  hasGravity?: boolean;
  setHasGravity?: (hasGravity: boolean) => void;
  canHaveGravity: boolean;
}

export default function NewObjectControls({ 
  canHaveGravity = false,
  transformMode, 
  cycleTransformMode, 
  handleDone,
  handleCancel,
  color,
  setColor,
  setTransformMode,
  hasGravity,
  setHasGravity
}: NewObjectControlsProps) {
  const buttonStyle = {
    padding: '8px 16px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#4a90e2',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
    // textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
    width: '120px',
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      
      if (key === 'g') {
        setTransformMode('move');
      } else if (key === 'r') {
        setTransformMode('rotate');
      } else if (key === 's') {
        setTransformMode('scale');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setTransformMode]);

  return (
    <div className='pos-abs right-0 mr-5  bottom-0 flex-col  pa-2 bord-r-5' style={{ 
      boxShadow: "0 3px 1px 1px #805300, inset 0 2px 5px 2px #FFD700",
      marginBottom: "60px",
      background: "linear-gradient(180deg, #E9BC46, #BB852E)",
      zIndex: 1000, 
    }}>
      <div className="flex-row flex-justify-between w-100">
        <button  className='noborder tx-white tx-altfont-1 bg-trans   opaci-chov--50 mb- py-2 tx-shadow-5'
          style={{
            // color: '#ff6666',
          }}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <GameButton 
          classOverride='tx-mdl'
          type="alpha"
          onClick={handleDone}
        >
          DONE
        </GameButton>
      </div>
      <hr className='w-100 opaci-40 pa-0 ' />
      {/* <div className="tx-altfont-1 tx-center tx-white tx-shadow-5  pb-1">Color</div> */}
      <div className='flex-row gap-2 mb-1 pb-1'>
        <div className='flex-col gap-1 flex-1 flex-justify-start tx-shadow-5'>
          <label htmlFor='color-input' className=' tx-altfont-1 pointer tx-white tx-sm'
           style={{paddingBottom:" "}}>Color</label>
        <input 
        id='color-input'
        className=' noborder bord-r-5'
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{
            width: '25px',
            height: '25px',
            cursor: 'pointer',
          }}
        />
        </div>
        {/* <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          padding: '4px 8px',
          borderRadius: '4px',
          color: '#ffffff',
          fontSize: '0.9rem',
          flexGrow: 1,
          textAlign: 'center',
        }}>
          {color}
        </div> */}
        {/* Has Gravity */}
        {//canHaveGravity &&
        (
          <div className='flex-col tx-white pb-1' >
            <label htmlFor='gravity-checkbox' className=' pointer tx-sm tx-center tx-shadow-5 tx-altfont-1'
            style={{paddingBottom:" 7px", paddingTop:"2px"}}>
              Gravity</label>
            <input 
            id="gravity-checkbox"

            className='scale-200 mt- 2 3 pointer'
            type="checkbox" 
            checked={hasGravity}
            onChange={(e) => setHasGravity?.(e.target.checked)}
          />
        </div>
        )}
      </div>

      <div className='flex-row gap-1 '>
      <GameButton classOverride="bord-r-100"
          type={transformMode === 'move' ? 'white' : ''}
          onClick={() => setTransformMode('move')}
        >
          <div className="flex-col tx-mdl">
            <div>✋</div>
          </div>
        </GameButton>
        <GameButton classOverride="bord-r-100"
          type={transformMode === 'rotate' ? 'white' : ''}
          onClick={() => setTransformMode('rotate')}
        >
          <div className="flex-col tx-mdl">
            <div>🔄</div>
          </div>
        </GameButton>
        <GameButton classOverride="bord-r-100"
          type={transformMode === 'scale' ? 'white' : ''}
          onClick={() => setTransformMode('scale')}
        >
          <div className="flex-col tx-mdl">
            <div>📐</div>
          </div>
        </GameButton>
        {/* <button 
          style={{
            ...buttonStyle,
            backgroundColor: transformMode === 'move' ? '#4a90e2' : 'rgba(74, 144, 226, 0.25)',
            width: '25px',
          }}
          onClick={() => setTransformMode('move')}
          className="flex-col"
        >
          G 🚶‍♂️
        </button>
        
        <button 
          style={{
            ...buttonStyle,
            backgroundColor: transformMode === 'rotate' ? '#4a90e2' : 'rgba(74, 144, 226, 0.25)',
            width: '25px',
          }}
          onClick={() => setTransformMode('rotate')}
          className="flex-col"
        >
          R 🔄
        </button>
        
        <button 
          style={{
            ...buttonStyle,
            backgroundColor: transformMode === 'scale' ? '#4a90e2' : 'rgba(74, 144, 226, 0.25)',
            width: '25px',
          }}
          onClick={() => setTransformMode('scale')}
          className="flex-col"
        >
          S 📏
        </button> */}
      </div>
    </div>
  )
} 