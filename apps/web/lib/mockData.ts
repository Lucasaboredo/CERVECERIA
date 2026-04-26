import type { Beer, Drink, Food, HappyHourStatus, Style } from './api'

export const mockDrinks: Drink[] = [
  // Gins Nacionales
  { id: 'd1', name: 'MESOPOTAMIA (Local)', category: 'Gins Nacionales', price: 5500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd2', name: 'PEREGRINO PINK (Local)', category: 'Gins Nacionales', price: 5500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd3', name: 'RESTINGA', category: 'Gins Nacionales', price: 5500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd4', name: 'APOSTOLES', category: 'Gins Nacionales', price: 6000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd5', name: 'SPIRITO BLU', category: 'Gins Nacionales', price: 5500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd6', name: 'ACONCAGUA', category: 'Gins Nacionales', price: 6000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd7', name: 'ACONCAGUA BLANCO', category: 'Gins Nacionales', price: 6500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd8', name: 'ACONCAGUA PINK', category: 'Gins Nacionales', price: 6500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd9', name: 'SINESTESIA', category: 'Gins Nacionales', price: 5500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd10', name: 'JARDIN ESCONDIDO', category: 'Gins Nacionales', price: 5500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd11', name: 'KUNUK 5973', category: 'Gins Nacionales', price: 6500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd12', name: 'ALQUIMISTA', category: 'Gins Nacionales', price: 7000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd13', name: 'MALARIA', category: 'Gins Nacionales', price: 7000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd14', name: 'MALARIA BLACK', category: 'Gins Nacionales', price: 7500, available: true, createdAt: '', updatedAt: '' },
  // Gins Importados
  { id: 'd15', name: 'GORDONS', category: 'Gins Importados', price: 6000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd16', name: 'BRIGHTON', category: 'Gins Importados', price: 5500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd17', name: 'BEEFEATER', category: 'Gins Importados', price: 7000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd18', name: 'BEEFEATER 24', category: 'Gins Importados', price: 8500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd19', name: 'TANQUERAY', category: 'Gins Importados', price: 7500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd20', name: 'TANQUERAY SEVILLA', category: 'Gins Importados', price: 8000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd21', name: 'TANQUERAY ROYALE', category: 'Gins Importados', price: 8000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd22', name: 'BULLDOG', category: 'Gins Importados', price: 8000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd23', name: 'BOMBAY SAPPHIRE', category: 'Gins Importados', price: 8000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd24', name: 'HENDRICK’S', category: 'Gins Importados', price: 12000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd25', name: 'MONKEY 47', category: 'Gins Importados', price: 16000, available: true, createdAt: '', updatedAt: '' },
  // Aperitivos
  { id: 'd26', name: 'FERNET BRANCA', category: 'Aperitivos', description: 'FERNET BRANCA - COCA COLA', price: 6000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd27', name: 'FERNET BRANCA IRLANDÉS', category: 'Aperitivos', description: 'FERNET BRANCA - COCA COLA - WHISKY', price: 7500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd28', name: 'VERMOUTH CINZANO', category: 'Aperitivos', description: 'VERMOUTH ROSSO - SODA/TÓNICA', price: 4500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd29', name: 'VERMOUTH PAIS (Local)', category: 'Aperitivos', description: 'VERMOUTH ROSSO - SODA/TÓNICA', price: 4500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd30', name: 'VERMOUTH LUNFA', category: 'Aperitivos', description: 'VERMOUTH ROSSO - SODA/TÓNICA', price: 6500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd31', name: 'VERMOUTH LA FUERZA', category: 'Aperitivos', description: 'VERMOUTH ROSSO - SODA/TÓNICA', price: 7000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd32', name: 'CYNAR JULEP', category: 'Aperitivos', description: 'CYNAR - TÓNICA - JUGO DE POMELO - MENTA', price: 6500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd33', name: 'CAIPICHOFA', category: 'Aperitivos', description: 'CYNAR - LIMA - AZUCAR - SODA', price: 5000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd34', name: 'GARIBALDI', category: 'Aperitivos', description: 'CAMPARI - JUGO DE NARANJA', price: 6000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd35', name: 'CAMPARI TONIC', category: 'Aperitivos', description: 'CAMPARI - TÓNICA', price: 5000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd36', name: 'APEROL SPRITZ', category: 'Aperitivos', description: 'APEROL - ESPUMANTE - SODA', price: 8000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd37', name: 'NEGRONI', category: 'Aperitivos', description: 'GIN - CAMPARI - VERMOUTH ROSSO', price: 6500, available: true, createdAt: '', updatedAt: '' },
  // con Gin
  { id: 'd38', name: 'TOM COLLINS', category: 'con Gin:', description: 'GIN - JUGO DE LIMÓN - SYRUP - SODA', price: 5500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd39', name: 'LADY COLLINS', category: 'con Gin:', description: 'GIN - JUGO DE LIMÓN - GRANADINA', price: 5500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd40', name: 'LADRÓN DE BICIS', category: 'con Gin:', description: 'GIN - CAMPARI - JUGO DE POMELO - JUGO DE LIMÓN - SYRUP - SODA', price: 6500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd41', name: 'GREEN GARDEN', category: 'con Gin:', description: 'GIN - JUGO DE LIMÓN - SYRUP - ALBAHACA - PEPINO', price: 7000, available: true, createdAt: '', updatedAt: '' },
  // con Vodka
  { id: 'd42', name: 'CAIPIROSKA', category: 'con Vodka:', description: 'VODKA - JUGO DE LIMÓN - SYRUP - LIMA', price: 7000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd43', name: 'VODKA LIMA LIMÓN', category: 'con Vodka:', description: 'VODKA - JUGO DE LIMÓN - SYRUP - LIMA - SODA', price: 7000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd44', name: 'VODKA ENERGY', category: 'con Vodka:', description: 'VODKA - ENERGIZANTE', price: 7500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd45', name: 'BLACK RUSSIAN', category: 'con Vodka:', description: 'VODKA - BORGHETTI', price: 6500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd46', name: 'APPLE BOMB', category: 'con Vodka:', description: 'VODKA - WHISKY DE MIEL - JUGO DE LIMÓN - JUGO DE MANZANA - SYRUP - ALBAHACA', price: 7500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd47', name: 'CACAO 60', category: 'con Vodka:', description: 'VODKA - DULCE DE LECHE - LICOR DE CHOCOLATE - BARRA DE CACAO 60', price: 8000, available: true, createdAt: '', updatedAt: '' },
  // con Ron
  { id: 'd48', name: 'MOJITO', category: 'con Ron:', description: 'RON - JUGO DE LIMÓN - SYRUP - MENTA - SODA', price: 6500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd49', name: 'CUBA LIBRE', category: 'con Ron:', description: 'RON - COCA COLA - JUGO DE LIMÓN', price: 6000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd50', name: 'TROPICAL SUNRISE', category: 'con Ron:', description: 'RON - JUGO DE NARANJA - JUGO DE LIMÓN - SYRUP - GRANADINA - SODA', price: 7000, available: true, createdAt: '', updatedAt: '' },
  // con Whisky
  { id: 'd51', name: 'MINT JULEP', category: 'con Whisky:', description: 'WHISKY - MENTA - SYRUP', price: 7500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd52', name: 'PENICILINA', category: 'con Whisky:', description: 'WHISKY - SYRUP DE MIEL - JUGO DE LIMÓN - JENGIBRE - SODA', price: 8000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd53', name: 'WHISKY SOUR', category: 'con Whisky:', description: 'WHISKY - JUGO DE LIMÓN - CLARA DE HUEVO - SYRUP', price: 8000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd54', name: 'OLD FASHIONED', category: 'con Whisky:', description: 'WHISKY - BITTER ANGOSTURA - AZUCAR', price: 8500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd55', name: 'BLACK JACK', category: 'con Whisky:', description: 'WHISKY - BORGHETTI - SYRUP DE MIEL', price: 8000, available: true, createdAt: '', updatedAt: '' },
  // Whiskies
  { id: 'd56', name: 'JIM BEAM', category: 'Whiskies', price: 6500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd57', name: 'JIM BEAM HONEY', category: 'Whiskies', price: 6500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd58', name: 'JACK DANIELS', category: 'Whiskies', price: 7000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd59', name: 'JAMESON', category: 'Whiskies', price: 6000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd60', name: 'J. WALKER RED', category: 'Whiskies', price: 6000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd61', name: 'J. WALKER DOUBLE BLACK', category: 'Whiskies', price: 10000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd62', name: 'MONKEY SHOULDER', category: 'Whiskies', price: 9500, available: true, createdAt: '', updatedAt: '' },
  // Carta de Vinos (en botella)
  { id: 'd63', name: 'NICASIA RED BLEND', category: 'Carta de Vinos', price: 16000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd64', name: 'TRUMPETER MALBEC', category: 'Carta de Vinos', price: 16000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd65', name: 'SAINT FELICIEN MALBEC', category: 'Carta de Vinos', price: 18000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd66', name: 'SAINT FELICIEN CABERNET FRANC', category: 'Carta de Vinos', price: 18000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd67', name: 'SAINT FELICIEN SAUVIGNON BLANC', category: 'Carta de Vinos', price: 18000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd68', name: 'DV CATENA CABERNET - MALBEC', category: 'Carta de Vinos', price: 24000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd69', name: 'DV CATENA CHARDONNAY', category: 'Carta de Vinos', price: 25000, available: true, createdAt: '', updatedAt: '' },
  // Vinos por copa
  { id: 'd70', name: 'LAS PERDICES MALBEC', category: 'Vinos por copa', price: 5500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd71', name: 'LAS PERDICES RED BLEND', category: 'Vinos por copa', price: 5500, available: true, createdAt: '', updatedAt: '' },
  { id: 'd72', name: 'LAS PERDICES CHARDONNAY', category: 'Vinos por copa', price: 5500, available: true, createdAt: '', updatedAt: '' },
  // Sin Alcohol
  { id: 'd73', name: 'COCA COLA / ZERO', category: 'Sin Alcohol', price: 3000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd74', name: 'FANTA', category: 'Sin Alcohol', price: 3000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd75', name: 'SPRITE', category: 'Sin Alcohol', price: 3000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd76', name: 'SPEED', category: 'Sin Alcohol', price: 3000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd77', name: 'LIMONADA', category: 'Sin Alcohol', description: 'JUGO DE LIMÓN - SYRUP - AGUA', price: 4000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd78', name: 'BERRY & LIME', category: 'Sin Alcohol', description: 'FRUTOS ROJOS - LIMA - SYRUP - SODA', price: 6000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd79', name: 'GINGER APPLE', category: 'Sin Alcohol', description: 'JUGO DE MANZANA - LIMA - JENGIBRE', price: 6000, available: true, createdAt: '', updatedAt: '' },
  { id: 'd80', name: 'ARANCHERRY', category: 'Sin Alcohol', description: 'JUGO DE NARANJA - ALMIBAR DE CEREZAS - AGUA', price: 5500, available: true, createdAt: '', updatedAt: '' },
];

export const mockBeers: Beer[] = [
  // en Botellita
  { id: 'b1', name: 'HEINEKEN', description: 'HEINEKEN - PILSEN', style: 'Botellita', origin: 'Local', ibu: 0, abv: 0, priceHalf: 5000, pricePint: 5000, onTap: false, bestseller: false, createdAt: '', updatedAt: '' },
  { id: 'b2', name: 'HEINEKEN 0.0', description: 'HEINEKEN - PILSEN SIN ALCOHOL', style: 'Botellita', origin: 'Local', ibu: 0, abv: 0, priceHalf: 5000, pricePint: 5000, onTap: false, bestseller: false, createdAt: '', updatedAt: '' },
  
  // en Canilla
  { id: 'b3', name: 'MUNICH LAGER', description: 'OKCIDENTA - PILSEN', style: 'Canilla', origin: 'Local', ibu: 0, abv: 0, priceHalf: 5000, pricePint: 5000, onTap: true, bestseller: true, createdAt: '', updatedAt: '' },
  { id: 'b4', name: 'CARANCHO', description: 'OKCIDENTA - APA', style: 'Canilla', origin: 'Local', ibu: 0, abv: 0, priceHalf: 5500, pricePint: 5500, onTap: true, bestseller: false, createdAt: '', updatedAt: '' },
  { id: 'b5', name: 'SESSION IPA', description: 'ASTOR - SESSION IPA', style: 'Canilla', origin: 'Local', ibu: 0, abv: 0, priceHalf: 6500, pricePint: 6500, onTap: true, bestseller: true, createdAt: '', updatedAt: '' },
  { id: 'b6', name: '449 IPA', description: 'OKCIDENTA - IPA', style: 'Canilla', origin: 'Local', ibu: 0, abv: 0, priceHalf: 6000, pricePint: 6000, onTap: true, bestseller: false, createdAt: '', updatedAt: '' },
  { id: 'b7', name: 'MACEDONIA', description: 'MUR - MINI NEIPA', style: 'Canilla', origin: 'Local', ibu: 0, abv: 0, priceHalf: 6500, pricePint: 6500, onTap: true, bestseller: false, createdAt: '', updatedAt: '' },
  { id: 'b8', name: 'MUNDO TRAMBOLICO', description: 'ASTOR - DOBLE NEIPA', style: 'Canilla', origin: 'Local', ibu: 0, abv: 0, priceHalf: 7000, pricePint: 7000, onTap: true, bestseller: false, createdAt: '', updatedAt: '' },
  { id: 'b9', name: 'AMBAR', description: 'MUR - AMBER ALE', style: 'Canilla', origin: 'Local', ibu: 0, abv: 0, priceHalf: 5500, pricePint: 5500, onTap: true, bestseller: false, createdAt: '', updatedAt: '' },
  { id: 'b10', name: 'ROBUST PORTER', description: 'ASTOR - PORTER', style: 'Canilla', origin: 'Local', ibu: 0, abv: 0, priceHalf: 5500, pricePint: 5500, onTap: true, bestseller: false, createdAt: '', updatedAt: '' },

  // en Botella (Barrel Aged)
  { id: 'b11', name: 'LA VUELTA DEL 420', description: 'ASTOR - GINGER CON SESSION IPA', style: 'Botella Barrel Aged', origin: 'Local', ibu: 0, abv: 0, priceHalf: 20000, pricePint: 20000, onTap: false, bestseller: false, createdAt: '', updatedAt: '' },
  { id: 'b12', name: 'COSA SALVAJE', description: 'ASTOR - GOLDEN SOUR Y ORUJO DE BONARDA', style: 'Botella Barrel Aged', origin: 'Local', ibu: 0, abv: 0, priceHalf: 24000, pricePint: 24000, onTap: false, bestseller: false, createdAt: '', updatedAt: '' },
  { id: 'b13', name: 'CONJETURA DIVERGENTE', description: 'OKCIDENTA - OUD BRUIN', style: 'Botella Barrel Aged', origin: 'Local', ibu: 0, abv: 0, priceHalf: 20000, pricePint: 20000, onTap: false, bestseller: false, createdAt: '', updatedAt: '' },
  { id: 'b14', name: 'ESTUPIDO Y SENSUAL', description: 'OKCIDENTA - FLANDERS RED', style: 'Botella Barrel Aged', origin: 'Local', ibu: 0, abv: 0, priceHalf: 20500, pricePint: 20500, onTap: false, bestseller: false, createdAt: '', updatedAt: '' },
  { id: 'b15', name: 'JOYA PERDIDA', description: 'OKCIDENTA - BARLEY WINE', style: 'Botella Barrel Aged', origin: 'Local', ibu: 0, abv: 0, priceHalf: 20000, pricePint: 20000, onTap: false, bestseller: false, createdAt: '', updatedAt: '' },
  { id: 'b16', name: 'ORDEN PARALELO', description: 'OKCIDENTA - AMERICAN BARLEY WINE', style: 'Botella Barrel Aged', origin: 'Local', ibu: 0, abv: 0, priceHalf: 21000, pricePint: 21000, onTap: false, bestseller: false, createdAt: '', updatedAt: '' },
  { id: 'b17', name: 'PARADOJA NOCTURNA', description: 'OKCIDENTA - IMPERIAL STOUT', style: 'Botella Barrel Aged', origin: 'Local', ibu: 0, abv: 0, priceHalf: 23000, pricePint: 23000, onTap: false, bestseller: false, createdAt: '', updatedAt: '' },
];

export const mockFood: Food[] = [
  { id: 'f1', name: 'PAPAS AL HORNO', category: 'Para Picar', description: 'CON DIPS DE TOMATES SECOS Y AJO Y SALSA ALIOLI', price: 10000, available: true, createdAt: '', updatedAt: '' },
  { id: 'f2', name: 'BASTONCITOS VEGETALES', category: 'Para Picar', description: 'EMPANADOS AL HORNO DE ZUCCHINI, ZANAHORIA Y BERENJENAS CON DIP VERDE Y SALSA DE SOJA', price: 10000, available: true, createdAt: '', updatedAt: '' },
  { id: 'f3', name: 'NACHOS', category: 'Para Picar', description: 'CON DIPS DE GUACAMOLE, SALSA PICANTE Y SALSA ALIOLI', price: 9000, available: true, createdAt: '', updatedAt: '' },
  { id: 'f4', name: 'NACHOS RECARGADOS', category: 'Para Picar', description: 'CON BONDIOLA DESMENUZADA, QUESO PATEGRAS, QUESO TYBO AHUMADO, PALTA, POROTOS NEGROS, QUESO CREMA, CEBOLLA MORADA Y TOMATE, SALSA ALIOLI Y CILANTRO', price: 19000, available: true, createdAt: '', updatedAt: '' },
  { id: 'f5', name: 'CHICKEN CRISPY', category: 'Para Picar', description: 'CON DIPS DE MOSTAZA CON LIMÓN Y SALSA ALIOLI', price: 13000, available: true, createdAt: '', updatedAt: '' },
  { id: 'f6', name: 'BOMBITAS DE PAPA', category: 'Para Picar', description: 'CON DIPS DE TOMATES SECOS Y AJO Y SALSA ALIOLI', price: 14500, available: true, createdAt: '', updatedAt: '' },
  { id: 'f7', name: 'TABLA CLÁSICA', category: 'Para Picar', description: 'SALAME PICADO GRUESO, JAMÓN CRUDO, JAMÓN COCIDO, MORTADELA, QUESO PATEGRAS Y QUESO HOLANDA, TOMATES CHERRY Y ACEITUNAS NEGRAS ACOMPAÑADA CON PAN BAGUETTE', price: 29000, available: true, createdAt: '', updatedAt: '' },
  { id: 'f8', name: 'TABLA CLÁSICA (CHICA)', category: 'Para Picar', description: 'SALAME PICADO GRUESO, JAMÓN CRUDO, JAMÓN COCIDO, MORTADELA, QUESO PATEGRAS Y QUESO HOLANDA, TOMATES CHERRY Y ACEITUNAS NEGRAS ACOMPAÑADA CON PAN BAGUETTE', price: 19000, available: true, createdAt: '', updatedAt: '' },
  { id: 'f9', name: 'TABLA DE QUESOS', category: 'Para Picar', description: 'QUESO HOLANDA, QUESO PATEGRAS, QUESO AZUL, QUESO ATUEL, QUESO CAMEMBERT, BOCCONCINOS, HIGOS CON REDUCCIÓN DE ACETO BALSÁMICO, PESTO, NUECES Y ACEITUNAS VERDES ACOMPAÑADA CON PAN BAGUETTE', price: 29000, available: true, createdAt: '', updatedAt: '' },
  { id: 'f10', name: 'TABLA DE QUESOS (CHICA)', category: 'Para Picar', description: 'QUESO HOLANDA, QUESO PATEGRAS, QUESO AZUL, QUESO ATUEL, QUESO CAMEMBERT, BOCCONCINOS, HIGOS CON REDUCCIÓN DE ACETO BALSÁMICO, PESTO, NUECES Y ACEITUNAS VERDES ACOMPAÑADA CON PAN BAGUETTE', price: 19000, available: true, createdAt: '', updatedAt: '' },
  
  // Albondigas
  { id: 'f11', name: 'POLLO', category: 'Albondigas', description: 'ALBONDIGAS DE POLLO Y VEGETALES CON DIP VERDE Y DE MOSTAZA', price: 14000, available: true, createdAt: '', updatedAt: '' },
  { id: 'f12', name: 'VEGGIE', category: 'Albondigas', description: 'ALBONDIGAS DE LEGUMBRES Y VEGETALES CON DIP VERDE Y SALSA DE SOJA', price: 11000, available: true, createdAt: '', updatedAt: '' },
  
  // Brochettes
  { id: 'f13', name: 'POLLO', category: 'Brochettes', description: 'PECHUGA DE POLLO, BERENJENA, ZUCCHINI, MORRONES, CEBOLLAS, TOMATE CHERRY Y ACEITE DE OLIVA', price: 15000, available: true, createdAt: '', updatedAt: '' },
  { id: 'f14', name: 'BONDIOLA', category: 'Brochettes', description: 'BONDIOLA, CEBOLLAS, MORRONES, TOMATE CHERRY Y SALSA BARBACOA', price: 16500, available: true, createdAt: '', updatedAt: '' },
  
  // Fajitas
  { id: 'f15', name: 'BONDIOLA', category: 'Fajitas', description: 'BONDIOLA BRASEADA, VEGETALES SALTEADOS Y QUESO REGGIANITO ACOMPAÑADO DE CREMA DE MOSTAZA', price: 14000, available: true, createdAt: '', updatedAt: '' },
  { id: 'f16', name: 'OSOBUCO', category: 'Fajitas', description: 'OSOBUCO BRASEADO A LA CERVEZA NEGRA ACOMPAÑADO DE ENSALADA COLESLAW', price: 13000, available: true, createdAt: '', updatedAt: '' },
  { id: 'f17', name: 'POLLO', category: 'Fajitas', description: 'POLLO DESMENUZADO, VEGETALES SALTEADOS Y QUESO REGGIANITO ACOMPAÑADO DE CREMA DE MOSTAZA', price: 12000, available: true, createdAt: '', updatedAt: '' },
  { id: 'f18', name: '4 QUESOS', category: 'Fajitas', description: 'QUESO PATEGRAS, QUESO TYBO AHUMADO, QUESO AZUL Y QUESO REGGIANITO ACOMPAÑADO DE TOMATES CHERRY Y ACEITUNAS VERDES', price: 13500, available: true, createdAt: '', updatedAt: '' },
  
  // Wraps Calientes
  { id: 'f19', name: 'VEGGIE', category: 'Wraps Calientes', description: 'VEGETALES SALTEADOS, SALSA DE SOJA, ARROZ, HUEVO REVUELTO, QUESO UNTABLE, QUESO PATEGRAS Y MIX DE SEMILLAS', price: 11000, available: true, createdAt: '', updatedAt: '' },
  { id: 'f20', name: 'POLLO', category: 'Wraps Calientes', description: 'VEGETALES SALTEADOS, PECHUGA DE POLLO, ARROZ, HUEVO REVUELTO, QUESO UNTABLE Y QUESO PATEGRAS', price: 13500, available: true, createdAt: '', updatedAt: '' },
  { id: 'f21', name: 'HONGOS', category: 'Wraps Calientes', description: 'ARROZ INTEGRAL, VERDURAS, HONGOS PORTOBELLOS, HONGOS SHITAKE, QUESO UNTABLE Y QUESO PATEGRAS', price: 16000, available: true, createdAt: '', updatedAt: '' },
  
  // Focaccias
  { id: 'f22', name: 'SERRANA', category: 'Focaccias', description: 'SANDWICH DE FOCACCIA CON JAMÓN CRUDO, RÚCULA, TOMATE, QUESO PATEGRAS Y ACEITE DE OLIVA', price: 14000, available: true, createdAt: '', updatedAt: '' },
  { id: 'f23', name: 'ROMANA', category: 'Focaccias', description: 'SANDWICH DE FOCACCIA CON PANCETA AHUMADA, QUESO TYBO AHUMADO, PEPINOS AGRIDULCES Y MANTECA', price: 14000, available: true, createdAt: '', updatedAt: '' },
  { id: 'f24', name: 'AQUITANIA', category: 'Focaccias', description: 'SANDWICH DE FOCACCIA CON QUESO PATEGRAS, QUESO AZUL, PERAS CARAMELIZADAS, NUECES Y RÚCULA', price: 13000, available: true, createdAt: '', updatedAt: '' },
  { id: 'f25', name: 'CAPRESE', category: 'Focaccias', description: 'SANDWICH DE FOCACCIA CON JAMÓN COCIDO, QUESO PATEGRAS, TOMATES SECOS, ACEITUNAS NEGRAS Y ALBAHACA', price: 13500, available: true, createdAt: '', updatedAt: '' },
  { id: 'f26', name: 'BOLOGNA', category: 'Focaccias', description: 'SANDWICH DE FOCACCIA CON PESTO, MORTADELA CON PISTACHOS Y BOCCONCINOS', price: 14000, available: true, createdAt: '', updatedAt: '' },
];

export const mockStyles: Style[] = [
  { id: 's1', name: 'Canilla', createdAt: '' },
  { id: 's2', name: 'Botellita', createdAt: '' },
  { id: 's3', name: 'Botella Barrel Aged', createdAt: '' },
];

export const mockHappyHour: HappyHourStatus = {
  active: true,
  discount: 20,
  startTime: '18:00',
  endTime: '20:00',
  message: 'Happy Hour is ON'
};

export function getMockData(path: string): any {
  if (path.startsWith('beers')) {
    // Basic filter logic if needed
    if (path.includes('onTap=true')) return mockBeers.filter(b => b.onTap);
    return mockBeers;
  }
  if (path.startsWith('food')) return mockFood;
  if (path.startsWith('drinks')) return mockDrinks;
  if (path.startsWith('styles')) return mockStyles;
  if (path.startsWith('happy-hour/status')) return mockHappyHour;
  return null;
}
