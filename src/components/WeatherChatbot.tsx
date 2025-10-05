import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Bot, Sun, Cloud, CloudRain, Snowflake } from 'lucide-react';

interface WeatherChatbotProps {
  region: string;
  date: Date;
  touristSite?: string;
  weatherCondition?: string;
}

function WeatherChatbot({ region, date, weatherCondition, touristSite }: WeatherChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  // Determinar el personaje basado en las condiciones climáticas
  const getCharacterByWeather = () => {
    const condition = weatherCondition?.toLowerCase() || '';
    
    if (condition.includes('sunny') || condition.includes('clear')) {
      return {
        image: '/characters/sunny-bot.png',
        alt: 'Sunny Day Guide',
        bgColor: 'from-yellow-400 to-orange-400',
        icon: <Sun className="text-yellow-600" size={20} />,
        bubbleColor: 'bg-yellow-100 border-yellow-300'
      };
    } else if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('rainy')) {
      return {
        image: '/characters/rainy-bot.png',
        alt: 'Rainy Day Guide',
        bgColor: 'from-blue-400 to-cyan-500',
        icon: <CloudRain className="text-blue-600" size={20} />,
        bubbleColor: 'bg-blue-100 border-blue-300'
      };
    } else if (condition.includes('cloud') || condition.includes('overcast') || condition.includes('cloudy')) {
      return {
        image: '/characters/cloudy-bot.png',
        alt: 'Cloudy Day Guide',
        bgColor: 'from-gray-400 to-gray-500',
        icon: <Cloud className="text-gray-600" size={20} />,
        bubbleColor: 'bg-gray-100 border-gray-300'
      };
    } else if (condition.includes('snow') || condition.includes('cold') || condition.includes('snowy')) {
      return {
        image: '/characters/snowy-bot.png',
        alt: 'Snowy Day Guide',
        bgColor: 'from-cyan-300 to-blue-300',
        icon: <Snowflake className="text-cyan-600" size={20} />,
        bubbleColor: 'bg-cyan-100 border-cyan-300'
      };
    } else {
      // Default character
      return {
        image: '/characters/default-bot.png',
        alt: 'Weather Guide',
        bgColor: 'from-emerald-400 to-teal-500',
        icon: <Bot className="text-emerald-600" size={20} />,
        bubbleColor: 'bg-emerald-100 border-emerald-300'
      };
    }
  };

  const character = getCharacterByWeather();

  // Generar mensaje basado en si es un sitio específico o región general
  useEffect(() => {
    const locationName = touristSite || region;
    
    const messages = [
      `Want to know more about ${locationName}? I can tell you about the best spots and weather tips! 🌤️`,
      `Planning your trip to ${locationName}? Let me help you with local insights and weather advice! 🗺️`,
      `Curious about ${locationName}'s climate? I've got all the details you need for perfect planning! 🌈`,
      `Exploring ${locationName}? Ask me about hidden gems and weather conditions! 💎`,
      `Ready for ${locationName}? I'm here to share local knowledge and forecast tips! 📍`,
      `Visiting ${locationName} soon? I can help you prepare for the weather and activities! 🎒`
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setCurrentMessage(randomMessage);
  }, [region, touristSite, date]);

  return (
    <>
      {/* Chatbot Button with Full Character */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Speech Bubble */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              className={`${character.bubbleColor} border rounded-2xl px-4 py-3 shadow-lg max-w-xs`}
            >
              <p className="text-sm font-medium text-gray-800">{currentMessage}</p>
              <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-3 h-3 bg-inherit border-r border-b border-inherit"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character Button - IMAGEN COMPLETA SIN RECORTE */}
        <motion.button
          className="relative hover:scale-110 transition-transform duration-300 overflow-visible"
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
        >
          {/* Contenedor para la imagen completa */}
          <div className="relative">
            {/* Tu imagen del personaje completo - tamaño natural */}
            <img 
              src={character.image} 
              alt={character.alt}
              className="w-48 h-48 object-contain " // Tamaño ajustable aquí
              onError={(e) => {
                // Fallback si la imagen no carga
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = `w-24 h-24 rounded-full bg-gradient-to-br ${character.bgColor} flex items-center justify-center`;
                fallback.innerHTML = '<svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm3 0h-2v-6h2v6zm3 0h-2v-6h2v6z"/></svg>';
                target.parentNode?.appendChild(fallback);
              }}
            />
            
            {/* Online indicator */}
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-lg"></div>
            
            {/* Efecto de brillo sutil */}
            <div className="absolute inset-0rounded-lg pointer-events-none"></div>
          </div>
        </motion.button>
      </div>

      {/* Chatbot Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-end pb-6 pr-6 sm:pb-8 sm:pr-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Chat Window */}
            <motion.div
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md h-96 flex flex-col"
              initial={{ scale: 0.8, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25 }}
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${character.bgColor} rounded-t-3xl p-4 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      {character.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Weather Guide</h3>
                      <p className="text-white/80 text-sm">Online • Ready to help</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Character Image in Modal - También completa */}
              <div className="flex justify-center -mt-6 mb-2">
                <motion.div
                  className="overflow-visible"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <img 
                    src={character.image} 
                    alt={character.alt}
                    className="w-16 h-16 object-contain" // Tamaño más pequeño para el modal
                  />
                </motion.div>
              </div>

              {/* Chat Content */}
              <div className="flex-1 p-4 overflow-y-auto">
                {/* Welcome Message */}
                <div className="text-center mb-6">
                  <p className="text-gray-600 text-sm">
                    Hi! I'm your {character.alt.toLowerCase()}
                  </p>
                </div>

                {/* Bot Message */}
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                    <p className="text-gray-800 text-sm">{currentMessage}</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <button className="w-full text-left bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl px-4 py-3 hover:from-emerald-100 hover:to-teal-100 transition-colors">
                    <p className="font-semibold text-emerald-800 text-sm">Best time to visit {touristSite || region}</p>
                    <p className="text-emerald-600 text-xs">Optimal seasons and months</p>
                  </button>
                  
                  <button className="w-full text-left bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl px-4 py-3 hover:from-blue-100 hover:to-cyan-100 transition-colors">
                    <p className="font-semibold text-blue-800 text-sm">Weather alerts</p>
                    <p className="text-blue-600 text-xs">Current warnings and advisories</p>
                  </button>
                  
                  <button className="w-full text-left bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-2xl px-4 py-3 hover:from-purple-100 hover:to-violet-100 transition-colors">
                    <p className="font-semibold text-purple-800 text-sm">Packing tips</p>
                    <p className="text-purple-600 text-xs">What to bring for your trip</p>
                  </button>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask about weather, places, or tips..."
                    className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl px-4 py-3 hover:from-emerald-600 hover:to-teal-600 transition-colors">
                    <MessageCircle size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default WeatherChatbot;