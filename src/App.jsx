import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Star, Zap, Shield, Smartphone, Trophy, Users, ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Sparkles, Swords, Waves, Eye, UserCheck, Menu, X } from 'lucide-react'
import lugiaImage from './assets/lugia.png'
import personagemLogo from './assets/personagem-logo.png'
import pokemonGoLogo from './assets/pokemon-go-logo.png'
import gpsIcon from './assets/gps-icon.png'
import carousel1 from './assets/carousel-1.png'
import carousel2 from './assets/carousel-2.png'
import carousel3 from './assets/carousel-3.png'
import newLogo from './assets/new-logo.png'
import youtubeLogo from './assets/youtube-logo.png'
import gimmighoulImage from './assets/gimmighoul.png'
import eeveeImage from './assets/eevee.png'
import hisuianZoruaImage from './assets/hisuian-zorua.jpg'
import tatsugiriImage from './assets/tatsugiri.png'
import quaxlyImage from './assets/quaxly.png'
import honedgeImage from './assets/honedge.png'
import solgaleoImage from './assets/solgaleo.png'
import lunalaImage from './assets/lunala.png'
import terrakionImage from './assets/terrakion.png'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [visitCount, setVisitCount] = useState(1)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const intervalRef = useRef(null)

  // Efeito para controlar visibilidade da barra de navegação
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 10) {
        // Sempre mostrar no topo da página
        setIsNavVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Esconder quando rolar para baixo (após 100px)
        setIsNavVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Mostrar quando rolar para cima
        setIsNavVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])

  const carouselPokemon = [
    { 
      src: solgaleoImage, 
      alt: "Solgaleo",
      name: "SOLGALEO",
      type: "Psíquico/Aço",
      ranking: "#4 Master League (Score: 93.8)",
      cp: "CP Máximo: 4570",
      bio: "Solgaleo, conhecido como o Pokémon do Sol, é uma lenda viva de Alola. Este majestoso felino cósmico possui o poder de devorar a luz e irradiar energia solar intensa. Sua forma imponente e força descomunal o tornam um dos Pokémon mais respeitados e temidos em batalhas.",
      pvpSkills: "Fire Spin + Psychic Fangs + Iron Head",
      raidSkills: "Zen Headbutt + Solar Beam (DPS: 12.58)",
      fusion: "Pode se fundir com Necrozma para formar Dusk Mane Necrozma (Ranking #18), tornando-se um atacante Steel extremamente poderoso!"
    },
    { 
      src: lunalaImage, 
      alt: "Lunala",
      name: "LUNALA",
      type: "Psíquico/Fantasma", 
      ranking: "#7 Master League (Score: 90.7)",
      cp: "CP Máximo: 4570",
      bio: "Lunala, o Pokémon da Lua, é uma criatura etérea que governa a noite. Com suas asas que absorvem toda a luz, ela pode mergulhar o mundo em escuridão total. Sua natureza misteriosa e poderes sobrenaturais a tornam uma força formidável em qualquer batalha.",
      pvpSkills: "Shadow Claw + Shadow Ball + Moonblast",
      raidSkills: "Confusion + Shadow Ball (DPS: 15.42 - S-Tier Ghost #7)",
      fusion: "Pode se fundir com Necrozma para formar Dawn Wings Necrozma (Ranking #5), tornando-se o atacante Dark/Ghost #1 do jogo!"
    },
    { 
      src: terrakionImage, 
      alt: "Terrakion",
      name: "TERRAKION",
      type: "Pedra/Lutador",
      ranking: "#70 Master League (Score: 78.4)",
      cp: "CP Máximo: 4181",
      bio: "Terrakion, um dos lendários Espadachins da Justiça de Unova, é conhecido por sua força bruta e determinação inabalável. Este guerreiro rochoso protege Pokémon e humanos da injustiça, usando sua velocidade impressionante e ataques devastadores para derrotar seus inimigos.",
      pvpSkills: "Double Kick + Sacred Sword + Rock Slide",
      raidSkills: "Double Kick + Sacred Sword (DPS: 19.48 - S-Tier Fighting #4)",
      fusion: "Considerado o melhor atacante Fighting não-mega do jogo, sendo superior ao Shadow Machamp em performance geral!"
    }
  ]

  // Função para resetar o timer do carrossel
  const resetCarouselTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselPokemon.length)
    }, 10000) // Muda a cada 10 segundos para dar mais tempo de leitura
  }, [carouselPokemon.length])

  useEffect(() => {
    resetCarouselTimer()
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [resetCarouselTimer])

  // Função para trocar de aba e resetar o carrossel
  const changeTab = useCallback((newTab) => {
    setActiveTab(newTab)
    setCurrentSlide(0) // Volta para o primeiro slide
    setMobileMenuOpen(false) // Fecha o menu mobile
    resetCarouselTimer() // Reseta o timer do carrossel
  }, [resetCarouselTimer])

  // Contador de visitas real com API
  useEffect(() => {
    const registerVisit = async () => {
      try {
        const response = await fetch('/api/visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setVisitCount(data.total_unique_visitors)
          }
        } else {
          // Fallback para localStorage se API não estiver disponível
          console.warn('API não disponível, usando localStorage')
          const lastVisit = localStorage.getItem('lastVisit')
          const today = new Date().toDateString()
          let currentCount = parseInt(localStorage.getItem('visitCount') || '0')
          
          if (!lastVisit || lastVisit !== today) {
            currentCount += 1
            localStorage.setItem('visitCount', currentCount.toString())
            localStorage.setItem('lastVisit', today)
          }
          
          setVisitCount(currentCount)
        }
      } catch (error) {
        // Fallback para localStorage em caso de erro
        console.warn('Erro na API, usando localStorage:', error)
        const lastVisit = localStorage.getItem('lastVisit')
        const today = new Date().toDateString()
        let currentCount = parseInt(localStorage.getItem('visitCount') || '0')
        
        if (!lastVisit || lastVisit !== today) {
          currentCount += 1
          localStorage.setItem('visitCount', currentCount.toString())
          localStorage.setItem('lastVisit', today)
        }
        
        setVisitCount(currentCount)
      }
    }
    
    registerVisit()
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselPokemon.length)
    resetCarouselTimer() // Reseta o timer quando o usuário troca manualmente
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselPokemon.length) % carouselPokemon.length)
    resetCarouselTimer() // Reseta o timer quando o usuário troca manualmente
  }

  const services = [
    {
      title: "Farm de XP",
      description: "Acelere seu progresso com nosso serviço de farm de XP profissional",
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      price: "A partir de R$ 27,90",
      features: ["XP rápido e seguro", "Métodos otimizados", "Suporte 24/7"]
    },
    {
      title: "Farm de Stardust",
      description: "Acumule Stardust para fortalecer seus Pokémon favoritos",
      icon: <Star className="w-8 h-8 text-purple-500" />,
      price: "A partir de R$ 19,90",
      features: ["Stardust garantido", "Processo automatizado", "Resultados rápidos"]
    },
    {
      title: "Venda de Contas",
      description: "Contas premium com Pokémon raros e alto nível",
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      price: "A partir de R$ 60,00",
      features: ["Contas verificadas", "Pokémon raros", "Níveis altos"]
    },
    {
      title: "Capturas de Lendários",
      description: "Garanta seus Pokémon lendários favoritos com nossa equipe especializada",
      icon: <Trophy className="w-8 h-8 text-red-500" />,
      price: "A partir de R$ 20,00",
      features: ["100% de sucesso", "Pokémon lendários", "Equipe especializada", "Mínimo: 10 passes de batalha"]
    }
  ]

  const events = [
    {
      title: "Festa de 9º Aniversário",
      description: "Comemore 9 anos de Pokémon GO com eventos especiais e Pokémon exclusivos",
      icon: <Sparkles className="w-8 h-8 text-yellow-500" />,
      date: "1 - 6 de Julho",
      status: "Em Andamento",
      highlights: ["Shiny Gimmighoul", "Pikachu com chapéu", "Bulbasaur, Ivysaur e Venusaur especiais"],
      pokemonImage: gimmighoulImage,
      pokemonName: "Gimmighoul"
    },
    {
      title: "Community Day Classic: Eevee",
      description: "Evento clássico de dois dias com Eevee e suas evoluções",
      icon: <Star className="w-8 h-8 text-purple-500" />,
      date: "5 - 6 de Julho",
      status: "Em Andamento",
      highlights: ["Eevee Shiny", "Evoluções especiais", "Bônus de XP e Stardust"],
      pokemonImage: eeveeImage,
      pokemonName: "Eevee"
    },
    {
      title: "Celebração de Hisui",
      description: "Ultra Unlock com Pokémon da região de Hisui",
      icon: <MapPin className="w-8 h-8 text-blue-500" />,
      date: "8 - 13 de Julho",
      status: "Próximo",
      highlights: ["Hisuian Zorua e Zoroark", "4x XP e Stardust", "Shiny Hisuian Voltorb"],
      pokemonImage: hisuianZoruaImage,
      pokemonName: "Hisuian Zorua"
    },
    {
      title: "Festival Aquático 2025",
      description: "Evento aquático com Tatsugiri e Pokémon do tipo Água",
      icon: <Waves className="w-8 h-8 text-cyan-500" />,
      date: "15 - 20 de Julho",
      status: "Próximo",
      highlights: ["Tatsugiri debut", "Lapras com cachecol", "Shiny Staryu e Tirtouga"],
      pokemonImage: tatsugiriImage,
      pokemonName: "Tatsugiri"
    },
    {
      title: "Community Day: Quaxly",
      description: "Dia Comunitário com Quaxly e movimento exclusivo Hydro Cannon",
      icon: <Zap className="w-8 h-8 text-blue-400" />,
      date: "20 de Julho",
      status: "Próximo",
      highlights: ["Quaxly Shiny", "Hydro Cannon Quaquaval", "3x Stardust", "Aqua Step"],
      pokemonImage: quaxlyImage,
      pokemonName: "Quaxly"
    },
    {
      title: "Evento Aço e Escamas",
      description: "Ultra Unlock com Pokémon do tipo Aço e Dragão",
      icon: <Swords className="w-8 h-8 text-gray-500" />,
      date: "22 - 27 de Julho",
      status: "Próximo",
      highlights: ["Honedge, Doublade e Aegislash", "Shiny Rookidee", "4x XP e Stardust"],
      pokemonImage: honedgeImage,
      pokemonName: "Honedge"
    }
  ]

  const raidBosses = [
    {
      name: "Solgaleo",
      type: "Lendário",
      period: "8 - 14 de Julho",
      icon: <Trophy className="w-6 h-6 text-yellow-400" />,
      image: solgaleoImage
    },
    {
      name: "Terrakion",
      type: "Lendário", 
      period: "14 - 22 de Julho",
      icon: <Trophy className="w-6 h-6 text-orange-400" />,
      image: terrakionImage
    },
    {
      name: "Lunala",
      type: "Lendário",
      period: "22 - 28 de Julho",
      icon: <Trophy className="w-6 h-6 text-purple-400" />,
      image: lunalaImage
    }
  ]

  const spotlightHours = [
    { pokemon: "Pikachu com Chapéu", date: "1 de Julho", bonus: "2x Stardust" },
    { pokemon: "Voltorb/Hisuian Voltorb", date: "8 de Julho", bonus: "2x XP" },
    { pokemon: "Feebas", date: "15 de Julho", bonus: "2x Candy" },
    { pokemon: "Jigglypuff", date: "22 de Julho", bonus: "2x Transfer Candy" },
    { pokemon: "Roggenrola", date: "29 de Julho", bonus: "2x Evolution XP" }
  ]

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          
          {/* Retângulo Informativo dos Lendários */}
          <div className="bg-gradient-to-r from-black/70 via-purple-900/60 to-blue-900/70 backdrop-blur-sm rounded-2xl p-4 md:p-8 mb-8 max-w-5xl mx-auto border-2 border-white/20 shadow-2xl">
            <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-4 md:mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              🌟 Lendários Disponíveis Este Mês 🌟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-black/40 rounded-xl p-4 md:p-6 border border-yellow-400/30 hover:border-yellow-400/60 transition-all duration-300 text-center">
                <img src={solgaleoImage} alt="Solgaleo" className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 object-contain filter drop-shadow-lg" />
                <h3 className="text-lg md:text-xl font-bold text-yellow-300 mb-2">SOLGALEO</h3>
                <p className="text-cyan-300 font-semibold mb-1 text-sm md:text-base">Psíquico/Aço</p>
                <p className="text-white text-xs md:text-sm font-bold bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-2">
                  📅 8 - 14 de Julho
                </p>
              </div>
              
              <div className="bg-black/40 rounded-xl p-4 md:p-6 border border-purple-400/30 hover:border-purple-400/60 transition-all duration-300 text-center">
                <img src={lunalaImage} alt="Lunala" className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 object-contain filter drop-shadow-lg" />
                <h3 className="text-lg md:text-xl font-bold text-purple-300 mb-2">LUNALA</h3>
                <p className="text-cyan-300 font-semibold mb-1 text-sm md:text-base">Psíquico/Fantasma</p>
                <p className="text-white text-xs md:text-sm font-bold bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg p-2">
                  📅 22 - 28 de Julho
                </p>
              </div>
              
              <div className="bg-black/40 rounded-xl p-4 md:p-6 border border-orange-400/30 hover:border-orange-400/60 transition-all duration-300 text-center">
                <img src={terrakionImage} alt="Terrakion" className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 object-contain filter drop-shadow-lg" />
                <h3 className="text-lg md:text-xl font-bold text-orange-300 mb-2">TERRAKION</h3>
                <p className="text-cyan-300 font-semibold mb-1 text-sm md:text-base">Pedra/Lutador</p>
                <p className="text-white text-xs md:text-sm font-bold bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-2">
                  📅 14 - 22 de Julho
                </p>
              </div>
            </div>
            <p className="text-center text-blue-200 mt-4 md:mt-6 text-base md:text-lg font-medium">
              ⚡ Não perca a chance de capturar esses lendários poderosos! ⚡
            </p>
          </div>
          
          {/* Carrossel de Pokémon Lendários */}
          <div className="relative max-w-7xl mx-auto mb-12 px-4">
            <div className="relative h-auto min-h-[600px] md:h-[750px] overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-black/60 via-purple-900/40 to-blue-900/50 backdrop-blur-sm border-2 border-white/20 shadow-2xl">
              {carouselPokemon.map((pokemon, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === currentSlide ? 'opacity-100 translate-x-0' : 
                    index < currentSlide ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
                  }`}
                >
                  <div className="flex flex-col md:flex-row h-full p-4 md:p-8">
                    {/* Imagem do Pokémon e Poder Especial - Esquerda */}
                    <div className="flex-1 flex flex-col justify-center items-center mb-4 md:mb-0 md:pr-6">
                      <div className="relative group mb-3 md:mb-4">
                        <img
                          src={pokemon.src}
                          alt={pokemon.alt}
                          className="w-48 h-48 md:w-80 md:h-80 object-contain transition-all duration-700 group-hover:scale-110 group-hover:drop-shadow-2xl animate-float filter drop-shadow-xl"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/30 via-purple-500/30 to-cyan-400/30 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 via-blue-300/10 to-purple-300/10 blur-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-1000"></div>
                      </div>
                      
                      {/* Poder Especial embaixo da imagem */}
                      <div className="w-full max-w-xs md:max-w-sm bg-gradient-to-r from-purple-900/70 to-blue-900/70 rounded-xl p-3 md:p-4 border-2 border-purple-400/40 backdrop-blur-sm shadow-xl">
                        <h4 className="text-sm md:text-base font-bold text-white mb-2 flex items-center gap-2 justify-center">
                          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                          Poder Especial
                        </h4>
                        <p className="text-purple-100 text-xs leading-relaxed font-medium text-center">{pokemon.fusion}</p>
                      </div>
                    </div>
                    
                    {/* Informações do Pokémon - Direita */}
                    <div className="flex-1 flex flex-col justify-center space-y-3 md:space-y-4 md:pl-8">
                      <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
                          {pokemon.name}
                        </h2>
                        <p className="text-lg md:text-xl text-cyan-300 font-bold mb-1 drop-shadow-md">{pokemon.type}</p>
                        <p className="text-base md:text-lg text-yellow-300 font-bold drop-shadow-md">{pokemon.ranking}</p>
                        <p className="text-sm md:text-base text-purple-200 font-semibold">{pokemon.cp}</p>
                      </div>
                      
                      <div className="bg-black/50 rounded-xl p-3 md:p-4 border-2 border-white/20 backdrop-blur-sm shadow-xl">
                        <h3 className="text-base md:text-lg font-bold text-white mb-2 flex items-center gap-2">
                          <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                          Biografia
                        </h3>
                        <p className="text-blue-100 text-xs md:text-sm leading-relaxed font-medium">{pokemon.bio}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                        <div className="bg-black/50 rounded-xl p-3 md:p-4 border-2 border-red-400/30 backdrop-blur-sm shadow-lg hover:border-red-400/50 transition-all duration-300">
                          <h4 className="text-sm md:text-base font-bold text-white mb-2 flex items-center gap-2">
                            <Swords className="w-4 h-4 text-red-400" />
                            Melhor PvP
                          </h4>
                          <p className="text-green-200 text-xs font-mono font-bold leading-relaxed">{pokemon.pvpSkills}</p>
                        </div>
                        
                        <div className="bg-black/50 rounded-xl p-3 md:p-4 border-2 border-yellow-400/30 backdrop-blur-sm shadow-lg hover:border-yellow-400/50 transition-all duration-300">
                          <h4 className="text-sm md:text-base font-bold text-white mb-2 flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-yellow-400" />
                            Melhor Raid
                          </h4>
                          <p className="text-orange-200 text-xs font-mono font-bold leading-relaxed">{pokemon.raidSkills}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Controles de Navegação */}
              <button
                onClick={prevSlide}
                className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-125 shadow-xl border-2 border-white/20"
              >
                <ChevronLeft className="w-5 h-5 md:w-7 md:h-7" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-125 shadow-xl border-2 border-white/20"
              >
                <ChevronRight className="w-5 h-5 md:w-7 md:h-7" />
              </button>
              
              {/* Indicadores */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
                {carouselPokemon.map((pokemon, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-5 h-5 rounded-full transition-all duration-400 border-2 ${
                      index === currentSlide 
                        ? 'bg-yellow-400 scale-150 border-yellow-300 shadow-lg' 
                        : 'bg-white/60 hover:bg-white/80 border-white/40 hover:scale-125'
                    }`}
                    title={pokemon.name}
                  />
                ))}
              </div>
              
              {/* Barra de Progresso */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300"
                  style={{
                    width: `${((currentSlide + 1) / carouselPokemon.length) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mb-12">
            <div className="lugia-container group cursor-pointer mb-6">
              <img 
                src={personagemLogo} 
                alt="Canal LucasFLY" 
                className="h-96 w-auto transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:drop-shadow-2xl group-hover:brightness-125 animate-float"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 via-blue-300/10 to-purple-300/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-ping"></div>
            </div>
            <p className="text-2xl md:text-3xl font-semibold text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent hover:from-yellow-400 hover:via-pink-500 hover:to-red-500 transition-all duration-500 cursor-pointer animate-bounce hover:animate-pulse">
              CONHEÇA NOSSO PROJETO
            </p>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Nossos Serviços
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => changeTab('services')}
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-200 text-sm text-center">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">
            Por que escolher nossos serviços?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">100% Seguro</h3>
              <p className="text-blue-200">Métodos seguros que não violam os termos do jogo</p>
            </div>
            <div className="text-center">
              <Users className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Equipe Especializada</h3>
              <p className="text-blue-200">Treinadores experientes com anos de conhecimento</p>
            </div>
            <div className="text-center">
              <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Resultados Rápidos</h3>
              <p className="text-blue-200">Entrega rápida e eficiente de todos os serviços</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  const renderServices = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-12">
          Nossos Serviços
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  {service.icon}
                  <div>
                    <CardTitle className="text-white text-2xl">{service.title}</CardTitle>
                    <CardDescription className="text-blue-200 text-lg">
                      {service.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-yellow-400">{service.price}</div>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-white">
                        <Star className="w-4 h-4 text-yellow-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                    Contratar Serviço
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderRoot = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-12">
          Informações sobre Root
        </h1>
        
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white text-3xl flex items-center gap-4">
              <Smartphone className="w-8 h-8 text-green-400" />
              O que é Root?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-4">
            <p className="text-lg">
              Root é o processo de obter acesso administrativo completo ao sistema Android, 
              permitindo modificações avançadas que não são possíveis em dispositivos não-rootados.
            </p>
            <p>
              Para jogadores de Pokémon GO, dispositivos com root oferecem vantagens significativas 
              para automação e otimização do gameplay.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white text-2xl">
              Smartphones Compatíveis (Em Breve)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-3">Xiaomi</h3>
                <ul className="space-y-2">
                  <li>• Redmi Note Series</li>
                  <li>• Mi Series</li>
                  <li>• POCO Series</li>
                  <li>• Redmi Series</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-3">Motorola</h3>
                <ul className="space-y-2">
                  <li>• Moto G Series</li>
                  <li>• Moto E Series</li>
                  <li>• Edge Series</li>
                  <li>• One Series</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-2xl">
              Vantagens para Pokémon GO
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span>Automação avançada</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span>Controle total do sistema</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-400" />
                  <span>Otimização de performance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-red-400" />
                  <span>Recursos exclusivos</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Badge variant="outline" className="text-yellow-400 border-yellow-400 px-6 py-2 text-lg">
            Em breve: Venda de smartphones pré-configurados
          </Badge>
        </div>
      </div>
    </div>
  )

  const renderAbout = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Sobre Nosso Projeto
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-purple-600 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                🎮 Nossa Missão
              </h3>
              <p className="text-lg text-blue-200 leading-relaxed">
                Nosso site tem o intuito de trazer <span className="text-yellow-400 font-semibold">informações atualizadas sobre Pokémon GO</span> e oferecer <span className="text-cyan-400 font-semibold">serviços relacionados ao game de forma segura e confiável</span>.
              </p>
              <p className="text-lg text-blue-200 leading-relaxed">
                Somos uma comunidade apaixonada por Pokémon GO, dedicada a ajudar treinadores de todos os níveis a alcançarem seus objetivos no jogo com <span className="text-purple-400 font-semibold">métodos seguros e eficientes</span>.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative group">
                <img 
                  src={personagemLogo} 
                  alt="Nosso Mascote" 
                  className="h-64 w-auto transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-2xl animate-float"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-black/40 border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Segurança Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-200 text-center">
                  Utilizamos apenas métodos seguros que respeitam os termos de serviço do jogo, garantindo a proteção da sua conta.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Comunidade Ativa</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-200 text-center">
                  Fazemos parte de uma comunidade vibrante de treinadores que compartilham dicas, estratégias e experiências.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-yellow-500/30 hover:border-yellow-400 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Resultados Garantidos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-200 text-center">
                  Nossa equipe especializada garante resultados de qualidade em todos os serviços oferecidos.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-black/30 rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
              🌟 O Que Oferecemos
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                  <span className="text-blue-200">Informações atualizadas sobre eventos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-blue-200">Serviços de farm de XP e Stardust</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-blue-200">Capturas de Pokémon lendários</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                  <span className="text-blue-200">Contas premium verificadas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-blue-200">Suporte especializado 24/7</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-blue-200">Métodos seguros e confiáveis</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-xl text-blue-200 mb-6">
              Junte-se à nossa comunidade e leve sua jornada Pokémon GO para o próximo nível!
            </p>
            <div className="flex justify-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-bounce"></div>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  const renderEvents = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-12">
          Eventos Atuais
        </h1>
        
        {/* Eventos Principais */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {events.map((event, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {event.icon}
                    <Badge 
                      variant={event.status === 'Em Andamento' ? 'default' : 'secondary'}
                      className={event.status === 'Em Andamento' ? 'bg-green-500' : 'bg-blue-500'}
                    >
                      {event.status}
                    </Badge>
                  </div>
                  {event.pokemonImage && (
                    <div className="flex flex-col items-center">
                      <img 
                        src={event.pokemonImage} 
                        alt={event.pokemonName}
                        className="w-16 h-16 object-contain rounded-lg bg-white/10 p-1"
                      />
                      <span className="text-xs text-blue-200 mt-1">{event.pokemonName}</span>
                    </div>
                  )}
                </div>
                <CardTitle className="text-white text-xl">{event.title}</CardTitle>
                <CardDescription className="text-blue-200">
                  {event.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-yellow-400">
                    <Calendar className="w-4 h-4" />
                    <span className="font-semibold">{event.date}</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-white font-semibold">Destaques:</h4>
                    <ul className="space-y-1">
                      {event.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-blue-200 text-sm">
                          <Star className="w-3 h-3 text-yellow-400" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Raids Lendários */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-400" />
              Raids Lendários de Julho
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {raidBosses.map((boss, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-3">
                    <img 
                      src={boss.image} 
                      alt={boss.name}
                      className="w-20 h-20 object-contain rounded-lg bg-white/10 p-2"
                    />
                  </div>
                  <div className="flex justify-center mb-2">
                    {boss.icon}
                  </div>
                  <h3 className="text-white font-bold text-lg">{boss.name}</h3>
                  <p className="text-blue-200 text-sm">{boss.type}</p>
                  <p className="text-yellow-400 text-sm font-semibold">{boss.period}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Spotlight Hours */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center gap-3">
              <Clock className="w-8 h-8 text-purple-400" />
              Horas Spotlight de Julho
            </CardTitle>
            <CardDescription className="text-blue-200">
              Todas as terças-feiras das 18:00 às 19:00 (horário local)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {spotlightHours.map((spotlight, index) => (
                <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="text-white font-semibold">{spotlight.pokemon}</p>
                      <p className="text-blue-200 text-sm">{spotlight.date}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-purple-400 border-purple-400">
                    {spotlight.bonus}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full bg-gradient-to-r from-blue-900 via-purple-900 to-purple-800 backdrop-blur-sm z-50 border-b border-yellow-400/20 shadow-lg transition-transform duration-300 ease-in-out ${
        isNavVisible ? 'translate-y-0' : '-translate-y-full'
      }`} style={{background: 'linear-gradient(90deg, #1e3a8a 0%, #581c87 70%, #fbbf24 95%, #581c87 100%)'}}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* LucasFLY Logo - Esquerda */}
            <div className="flex items-center gap-3">
              <img src={personagemLogo} alt="Canal LucasFLY" className="h-8 sm:h-10 w-auto" />
              <span className="text-white font-light text-lg sm:text-xl">LucasFLY</span>
            </div>
            
            {/* Logo Pokémon GO - Centro */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              <img 
                src={pokemonGoLogo} 
                alt="Pokémon GO" 
                className="h-8 sm:h-10 w-auto transition-all duration-300 hover:scale-110 hover:drop-shadow-lg" 
              />
            </div>

            {/* Menu Hamburger Button - Direita */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110 group"
            >
              <div className="relative">
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 transition-transform duration-300 rotate-180 text-white" />
                ) : (
                  <img 
                    src={gpsIcon} 
                    alt="Menu GPS" 
                    className="w-12 h-12 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:drop-shadow-lg filter group-hover:brightness-110" 
                  />
                )}
              </div>
              <span className="text-white text-xs font-medium transition-all duration-300 group-hover:text-yellow-300 group-hover:scale-105">
                Menu
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Drawer Menu */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
        mobileMenuOpen ? 'visible' : 'invisible'
      }`}>
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Drawer */}
        <div className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-blue-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-lg border-l border-white/20 shadow-2xl transform transition-transform duration-500 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Drawer Header */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center gap-4">
              <img src={personagemLogo} alt="Canal LucasFLY" className="h-12 w-auto" />
              <div>
                <h2 className="text-white font-bold text-xl">LucasFLY</h2>
                <p className="text-blue-200 text-sm">Pokémon GO Services</p>
              </div>
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="p-6 space-y-4">
            <button
              onClick={() => changeTab('home')}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-lg group ${
                activeTab === 'home' ? 'bg-yellow-500/20 border-l-4 border-yellow-400' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                <span className={`text-lg font-medium transition-colors duration-300 ${
                  activeTab === 'home' ? 'text-yellow-400' : 'text-white group-hover:text-cyan-400'
                }`}>
                  Início
                </span>
              </div>
            </button>
            
            <button
              onClick={() => changeTab('services')}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-lg group ${
                activeTab === 'services' ? 'bg-yellow-500/20 border-l-4 border-yellow-400' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                <span className={`text-lg font-medium transition-colors duration-300 ${
                  activeTab === 'services' ? 'text-yellow-400' : 'text-white group-hover:text-purple-400'
                }`}>
                  Serviços
                </span>
              </div>
            </button>
            
            <button
              onClick={() => changeTab('events')}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-lg group ${
                activeTab === 'events' ? 'bg-yellow-500/20 border-l-4 border-yellow-400' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                <span className={`text-lg font-medium transition-colors duration-300 ${
                  activeTab === 'events' ? 'text-yellow-400' : 'text-white group-hover:text-pink-400'
                }`}>
                  Eventos
                </span>
              </div>
            </button>
            
            <button
              onClick={() => changeTab('about')}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-lg group ${
                activeTab === 'about' ? 'bg-yellow-500/20 border-l-4 border-yellow-400' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                <span className={`text-lg font-medium transition-colors duration-300 ${
                  activeTab === 'about' ? 'text-yellow-400' : 'text-white group-hover:text-green-400'
                }`}>
                  Sobre
                </span>
              </div>
            </button>
            
            <button
              onClick={() => changeTab('root')}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-lg group ${
                activeTab === 'root' ? 'bg-yellow-500/20 border-l-4 border-yellow-400' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                <span className={`text-lg font-medium transition-colors duration-300 ${
                  activeTab === 'root' ? 'text-yellow-400' : 'text-white group-hover:text-orange-400'
                }`}>
                  Root Info
                </span>
              </div>
            </button>
          </div>
          
          {/* Drawer Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/20">
            <div className="text-center">
              <p className="text-blue-200 text-sm mb-2">Pokémon GO Premium Services</p>
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'services' && renderServices()}
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'about' && renderAbout()}
        {activeTab === 'root' && renderRoot()}
      </div>

      {/* Footer */}
      <footer className="bg-black/90 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <img src={personagemLogo} alt="Canal LucasFLY" className="w-12 h-12" />
          </div>
          <p className="text-blue-200 mb-4">
            Serviços premium para treinadores Pokémon GO
          </p>
          <p className="text-sm text-gray-400">
            © 2024 Canal LucasFLY. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Contador de Visitas Real por IP */}
      <div className="fixed bottom-4 left-4 z-40">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/10">
          <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
            <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
            <span className="font-medium">Visitas:</span>
            <span className="text-yellow-400 font-bold">{visitCount.toLocaleString()}</span>
          </div>
          <div className="text-xs text-gray-400 mt-1 hidden sm:block">
            Visitantes únicos por IP
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

