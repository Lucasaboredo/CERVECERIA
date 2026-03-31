import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Wiping old database...');
  await prisma.drink.deleteMany({});
  await prisma.food.deleteMany({});
  await prisma.beer.deleteMany({});

  console.log('🌱 Seeding database...');

  // Admin user
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || 'brew-admin-2026',
    10,
  );
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@brew.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@brew.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created');

  // Happy Hour default
  const hhCount = await prisma.happyHour.count();
  if (hhCount === 0) {
    await prisma.happyHour.create({
      data: {
        startTime: '18:00',
        endTime: '20:00',
        discount: 20,
        daysOfWeek: JSON.stringify([1, 2, 3, 4, 5]),
        isActive: true,
      },
    });
  }

  // Seeding Drinks & Wines
  const drinksData = [
    // Gins Nacionales
    { name: 'MESOPOTAMIA (Local)', category: 'Gins Nacionales', price: 5500 },
    { name: 'PEREGRINO PINK (Local)', category: 'Gins Nacionales', price: 5500 },
    { name: 'RESTINGA', category: 'Gins Nacionales', price: 5500 },
    { name: 'APOSTOLES', category: 'Gins Nacionales', price: 6000 },
    { name: 'SPIRITO BLU', category: 'Gins Nacionales', price: 5500 },
    { name: 'ACONCAGUA', category: 'Gins Nacionales', price: 6000 },
    { name: 'ACONCAGUA BLANCO', category: 'Gins Nacionales', price: 6500 },
    { name: 'ACONCAGUA PINK', category: 'Gins Nacionales', price: 6500 },
    { name: 'SINESTESIA', category: 'Gins Nacionales', price: 5500 },
    { name: 'JARDIN ESCONDIDO', category: 'Gins Nacionales', price: 5500 },
    { name: 'KUNUK 5973', category: 'Gins Nacionales', price: 6500 },
    { name: 'ALQUIMISTA', category: 'Gins Nacionales', price: 7000 },
    { name: 'MALARIA', category: 'Gins Nacionales', price: 7000 },
    { name: 'MALARIA BLACK', category: 'Gins Nacionales', price: 7500 },
    // Gins Importados
    { name: 'GORDONS', category: 'Gins Importados', price: 6000 },
    { name: 'BRIGHTON', category: 'Gins Importados', price: 5500 },
    { name: 'BEEFEATER', category: 'Gins Importados', price: 7000 },
    { name: 'BEEFEATER 24', category: 'Gins Importados', price: 8500 },
    { name: 'TANQUERAY', category: 'Gins Importados', price: 7500 },
    { name: 'TANQUERAY SEVILLA', category: 'Gins Importados', price: 8000 },
    { name: 'TANQUERAY ROYALE', category: 'Gins Importados', price: 8000 },
    { name: 'BULLDOG', category: 'Gins Importados', price: 8000 },
    { name: 'BOMBAY SAPPHIRE', category: 'Gins Importados', price: 8000 },
    { name: 'HENDRICK’S', category: 'Gins Importados', price: 12000 },
    { name: 'MONKEY 47', category: 'Gins Importados', price: 16000 },
    // Aperitivos
    { name: 'FERNET BRANCA', category: 'Aperitivos', description: 'FERNET BRANCA - COCA COLA', price: 6000 },
    { name: 'FERNET BRANCA IRLANDÉS', category: 'Aperitivos', description: 'FERNET BRANCA - COCA COLA - WHISKY', price: 7500 },
    { name: 'VERMOUTH CINZANO', category: 'Aperitivos', description: 'VERMOUTH ROSSO - SODA/TÓNICA', price: 4500 },
    { name: 'VERMOUTH PAIS (Local)', category: 'Aperitivos', description: 'VERMOUTH ROSSO - SODA/TÓNICA', price: 4500 },
    { name: 'VERMOUTH LUNFA', category: 'Aperitivos', description: 'VERMOUTH ROSSO - SODA/TÓNICA', price: 6500 },
    { name: 'VERMOUTH LA FUERZA', category: 'Aperitivos', description: 'VERMOUTH ROSSO - SODA/TÓNICA', price: 7000 },
    { name: 'CYNAR JULEP', category: 'Aperitivos', description: 'CYNAR - TÓNICA - JUGO DE POMELO - MENTA', price: 6500 },
    { name: 'CAIPICHOFA', category: 'Aperitivos', description: 'CYNAR - LIMA - AZUCAR - SODA', price: 5000 },
    { name: 'GARIBALDI', category: 'Aperitivos', description: 'CAMPARI - JUGO DE NARANJA', price: 6000 },
    { name: 'CAMPARI TONIC', category: 'Aperitivos', description: 'CAMPARI - TÓNICA', price: 5000 },
    { name: 'APEROL SPRITZ', category: 'Aperitivos', description: 'APEROL - ESPUMANTE - SODA', price: 8000 },
    { name: 'NEGRONI', category: 'Aperitivos', description: 'GIN - CAMPARI - VERMOUTH ROSSO', price: 6500 },
    // con Gin
    { name: 'TOM COLLINS', category: 'con Gin:', description: 'GIN - JUGO DE LIMÓN - SYRUP - SODA', price: 5500 },
    { name: 'LADY COLLINS', category: 'con Gin:', description: 'GIN - JUGO DE LIMÓN - GRANADINA', price: 5500 },
    { name: 'LADRÓN DE BICIS', category: 'con Gin:', description: 'GIN - CAMPARI - JUGO DE POMELO - JUGO DE LIMÓN - SYRUP - SODA', price: 6500 },
    { name: 'GREEN GARDEN', category: 'con Gin:', description: 'GIN - JUGO DE LIMÓN - SYRUP - ALBAHACA - PEPINO', price: 7000 },
    // con Vodka
    { name: 'CAIPIROSKA', category: 'con Vodka:', description: 'VODKA - JUGO DE LIMÓN - SYRUP - LIMA', price: 7000 },
    { name: 'VODKA LIMA LIMÓN', category: 'con Vodka:', description: 'VODKA - JUGO DE LIMÓN - SYRUP - LIMA - SODA', price: 7000 },
    { name: 'VODKA ENERGY', category: 'con Vodka:', description: 'VODKA - ENERGIZANTE', price: 7500 },
    { name: 'BLACK RUSSIAN', category: 'con Vodka:', description: 'VODKA - BORGHETTI', price: 6500 },
    { name: 'APPLE BOMB', category: 'con Vodka:', description: 'VODKA - WHISKY DE MIEL - JUGO DE LIMÓN - JUGO DE MANZANA - SYRUP - ALBAHACA', price: 7500 },
    { name: 'CACAO 60', category: 'con Vodka:', description: 'VODKA - DULCE DE LECHE - LICOR DE CHOCOLATE - BARRA DE CACAO 60', price: 8000 },
    // con Ron
    { name: 'MOJITO', category: 'con Ron:', description: 'RON - JUGO DE LIMÓN - SYRUP - MENTA - SODA', price: 6500 },
    { name: 'CUBA LIBRE', category: 'con Ron:', description: 'RON - COCA COLA - JUGO DE LIMÓN', price: 6000 },
    { name: 'TROPICAL SUNRISE', category: 'con Ron:', description: 'RON - JUGO DE NARANJA - JUGO DE LIMÓN - SYRUP - GRANADINA - SODA', price: 7000 },
    // con Whisky
    { name: 'MINT JULEP', category: 'con Whisky:', description: 'WHISKY - MENTA - SYRUP', price: 7500 },
    { name: 'PENICILINA', category: 'con Whisky:', description: 'WHISKY - SYRUP DE MIEL - JUGO DE LIMÓN - JENGIBRE - SODA', price: 8000 },
    { name: 'WHISKY SOUR', category: 'con Whisky:', description: 'WHISKY - JUGO DE LIMÓN - CLARA DE HUEVO - SYRUP', price: 8000 },
    { name: 'OLD FASHIONED', category: 'con Whisky:', description: 'WHISKY - BITTER ANGOSTURA - AZUCAR', price: 8500 },
    { name: 'BLACK JACK', category: 'con Whisky:', description: 'WHISKY - BORGHETTI - SYRUP DE MIEL', price: 8000 },
    // Whiskies
    { name: 'JIM BEAM', category: 'Whiskies', price: 6500 },
    { name: 'JIM BEAM HONEY', category: 'Whiskies', price: 6500 },
    { name: 'JACK DANIELS', category: 'Whiskies', price: 7000 },
    { name: 'JAMESON', category: 'Whiskies', price: 6000 },
    { name: 'J. WALKER RED', category: 'Whiskies', price: 6000 },
    { name: 'J. WALKER DOUBLE BLACK', category: 'Whiskies', price: 10000 },
    { name: 'MONKEY SHOULDER', category: 'Whiskies', price: 9500 },
    // Carta de Vinos (en botella)
    { name: 'NICASIA RED BLEND', category: 'Carta de Vinos', price: 16000 },
    { name: 'TRUMPETER MALBEC', category: 'Carta de Vinos', price: 16000 },
    { name: 'SAINT FELICIEN MALBEC', category: 'Carta de Vinos', price: 18000 },
    { name: 'SAINT FELICIEN CABERNET FRANC', category: 'Carta de Vinos', price: 18000 },
    { name: 'SAINT FELICIEN SAUVIGNON BLANC', category: 'Carta de Vinos', price: 18000 },
    { name: 'DV CATENA CABERNET - MALBEC', category: 'Carta de Vinos', price: 24000 },
    { name: 'DV CATENA CHARDONNAY', category: 'Carta de Vinos', price: 25000 },
    // Vinos por copa
    { name: 'LAS PERDICES MALBEC', category: 'Vinos por copa', price: 5500 },
    { name: 'LAS PERDICES RED BLEND', category: 'Vinos por copa', price: 5500 },
    { name: 'LAS PERDICES CHARDONNAY', category: 'Vinos por copa', price: 5500 },
    // Sin Alcohol
    { name: 'COCA COLA / ZERO', category: 'Sin Alcohol', price: 3000 },
    { name: 'FANTA', category: 'Sin Alcohol', price: 3000 },
    { name: 'SPRITE', category: 'Sin Alcohol', price: 3000 },
    { name: 'SPEED', category: 'Sin Alcohol', price: 3000 },
    { name: 'LIMONADA', category: 'Sin Alcohol', description: 'JUGO DE LIMÓN - SYRUP - AGUA', price: 4000 },
    { name: 'BERRY & LIME', category: 'Sin Alcohol', description: 'FRUTOS ROJOS - LIMA - SYRUP - SODA', price: 6000 },
    { name: 'GINGER APPLE', category: 'Sin Alcohol', description: 'JUGO DE MANZANA - LIMA - JENGIBRE', price: 6000 },
    { name: 'ARANCHERRY', category: 'Sin Alcohol', description: 'JUGO DE NARANJA - ALMIBAR DE CEREZAS - AGUA', price: 5500 },
  ];
  await prisma.drink.createMany({ data: drinksData });

  // Seeding Food
  const foodsData = [
    { name: 'PAPAS AL HORNO', category: 'Para Picar', description: 'CON DIPS DE TOMATES SECOS Y AJO Y SALSA ALIOLI', price: 10000 },
    { name: 'BASTONCITOS VEGETALES', category: 'Para Picar', description: 'EMPANADOS AL HORNO DE ZUCCHINI, ZANAHORIA Y BERENJENAS CON DIP VERDE Y SALSA DE SOJA', price: 10000 },
    { name: 'NACHOS', category: 'Para Picar', description: 'CON DIPS DE GUACAMOLE, SALSA PICANTE Y SALSA ALIOLI', price: 9000 },
    { name: 'NACHOS RECARGADOS', category: 'Para Picar', description: 'CON BONDIOLA DESMENUZADA, QUESO PATEGRAS, QUESO TYBO AHUMADO, PALTA, POROTOS NEGROS, QUESO CREMA, CEBOLLA MORADA Y TOMATE, SALSA ALIOLI Y CILANTRO', price: 19000 },
    { name: 'CHICKEN CRISPY', category: 'Para Picar', description: 'CON DIPS DE MOSTAZA CON LIMÓN Y SALSA ALIOLI', price: 13000 },
    { name: 'BOMBITAS DE PAPA', category: 'Para Picar', description: 'CON DIPS DE TOMATES SECOS Y AJO Y SALSA ALIOLI', price: 14500 },
    { name: 'TABLA CLÁSICA', category: 'Para Picar', description: 'SALAME PICADO GRUESO, JAMÓN CRUDO, JAMÓN COCIDO, MORTADELA, QUESO PATEGRAS Y QUESO HOLANDA, TOMATES CHERRY Y ACEITUNAS NEGRAS ACOMPAÑADA CON PAN BAGUETTE', price: 29000 },
    { name: 'TABLA CLÁSICA (CHICA)', category: 'Para Picar', description: 'SALAME PICADO GRUESO, JAMÓN CRUDO, JAMÓN COCIDO, MORTADELA, QUESO PATEGRAS Y QUESO HOLANDA, TOMATES CHERRY Y ACEITUNAS NEGRAS ACOMPAÑADA CON PAN BAGUETTE', price: 19000 },
    { name: 'TABLA DE QUESOS', category: 'Para Picar', description: 'QUESO HOLANDA, QUESO PATEGRAS, QUESO AZUL, QUESO ATUEL, QUESO CAMEMBERT, BOCCONCINOS, HIGOS CON REDUCCIÓN DE ACETO BALSÁMICO, PESTO, NUECES Y ACEITUNAS VERDES ACOMPAÑADA CON PAN BAGUETTE', price: 29000 },
    { name: 'TABLA DE QUESOS (CHICA)', category: 'Para Picar', description: 'QUESO HOLANDA, QUESO PATEGRAS, QUESO AZUL, QUESO ATUEL, QUESO CAMEMBERT, BOCCONCINOS, HIGOS CON REDUCCIÓN DE ACETO BALSÁMICO, PESTO, NUECES Y ACEITUNAS VERDES ACOMPAÑADA CON PAN BAGUETTE', price: 19000 },
    
    // Albondigas
    { name: 'POLLO', category: 'Albondigas', description: 'ALBONDIGAS DE POLLO Y VEGETALES CON DIP VERDE Y DE MOSTAZA', price: 14000 },
    { name: 'VEGGIE', category: 'Albondigas', description: 'ALBONDIGAS DE LEGUMBRES Y VEGETALES CON DIP VERDE Y SALSA DE SOJA', price: 11000 },
    
    // Brochettes
    { name: 'POLLO', category: 'Brochettes', description: 'PECHUGA DE POLLO, BERENJENA, ZUCCHINI, MORRONES, CEBOLLAS, TOMATE CHERRY Y ACEITE DE OLIVA', price: 15000 },
    { name: 'BONDIOLA', category: 'Brochettes', description: 'BONDIOLA, CEBOLLAS, MORRONES, TOMATE CHERRY Y SALSA BARBACOA', price: 16500 },
    
    // Fajitas
    { name: 'BONDIOLA', category: 'Fajitas', description: 'BONDIOLA BRASEADA, VEGETALES SALTEADOS Y QUESO REGGIANITO ACOMPAÑADO DE CREMA DE MOSTAZA', price: 14000 },
    { name: 'OSOBUCO', category: 'Fajitas', description: 'OSOBUCO BRASEADO A LA CERVEZA NEGRA ACOMPAÑADO DE ENSALADA COLESLAW', price: 13000 },
    { name: 'POLLO', category: 'Fajitas', description: 'POLLO DESMENUZADO, VEGETALES SALTEADOS Y QUESO REGGIANITO ACOMPAÑADO DE CREMA DE MOSTAZA', price: 12000 },
    { name: '4 QUESOS', category: 'Fajitas', description: 'QUESO PATEGRAS, QUESO TYBO AHUMADO, QUESO AZUL Y QUESO REGGIANITO ACOMPAÑADO DE TOMATES CHERRY Y ACEITUNAS VERDES', price: 13500 },
    
    // Wraps Calientes
    { name: 'VEGGIE', category: 'Wraps Calientes', description: 'VEGETALES SALTEADOS, SALSA DE SOJA, ARROZ, HUEVO REVUELTO, QUESO UNTABLE, QUESO PATEGRAS Y MIX DE SEMILLAS', price: 11000 },
    { name: 'POLLO', category: 'Wraps Calientes', description: 'VEGETALES SALTEADOS, PECHUGA DE POLLO, ARROZ, HUEVO REVUELTO, QUESO UNTABLE Y QUESO PATEGRAS', price: 13500 },
    { name: 'HONGOS', category: 'Wraps Calientes', description: 'ARROZ INTEGRAL, VERDURAS, HONGOS PORTOBELLOS, HONGOS SHITAKE, QUESO UNTABLE Y QUESO PATEGRAS', price: 16000 },
    
    // Focaccias
    { name: 'SERRANA', category: 'Focaccias', description: 'SANDWICH DE FOCACCIA CON JAMÓN CRUDO, RÚCULA, TOMATE, QUESO PATEGRAS Y ACEITE DE OLIVA', price: 14000 },
    { name: 'ROMANA', category: 'Focaccias', description: 'SANDWICH DE FOCACCIA CON PANCETA AHUMADA, QUESO TYBO AHUMADO, PEPINOS AGRIDULCES Y MANTECA', price: 14000 },
    { name: 'AQUITANIA', category: 'Focaccias', description: 'SANDWICH DE FOCACCIA CON QUESO PATEGRAS, QUESO AZUL, PERAS CARAMELIZADAS, NUECES Y RÚCULA', price: 13000 },
    { name: 'CAPRESE', category: 'Focaccias', description: 'SANDWICH DE FOCACCIA CON JAMÓN COCIDO, QUESO PATEGRAS, TOMATES SECOS, ACEITUNAS NEGRAS Y ALBAHACA', price: 13500 },
    { name: 'BOLOGNA', category: 'Focaccias', description: 'SANDWICH DE FOCACCIA CON PESTO, MORTADELA CON PISTACHOS Y BOCCONCINOS', price: 14000 },
  ];
  await prisma.food.createMany({ data: foodsData });

  // Seeding Beers
  const beersData = [
    // en Botellita
    { name: 'HEINEKEN', description: 'HEINEKEN - PILSEN', style: 'Botellita', origin: 'Local', ibu: 0, abv: 0, priceHalf: 5000, pricePint: 5000, onTap: false },
    { name: 'HEINEKEN 0.0', description: 'HEINEKEN - PILSEN SIN ALCOHOL', style: 'Botellita', origin: 'Local', ibu: 0, abv: 0, priceHalf: 5000, pricePint: 5000, onTap: false },
    
    // en Canilla
    { name: 'MUNICH LAGER', description: 'OKCIDENTA - PILSEN', style: 'Canilla', origin: 'Local', ibu: 0, abv: 0, priceHalf: 5000, pricePint: 5000, onTap: true },
    { name: 'CARANCHO', description: 'OKCIDENTA - APA', style: 'Canilla', origin: 'Local', ibu: 0, abv: 0, priceHalf: 5500, pricePint: 5500, onTap: true },
    { name: 'SESSION IPA', description: 'ASTOR - SESSION IPA', style: 'Canilla', origin: 'Local', ibu: 0, abv: 0, priceHalf: 6500, pricePint: 6500, onTap: true },
    { name: '449 IPA', description: 'OKCIDENTA - IPA', style: 'Canilla', origin: 'Local', ibu: 0, abv: 0, priceHalf: 6000, pricePint: 6000, onTap: true },
    { name: 'MACEDONIA', description: 'MUR - MINI NEIPA', style: 'Canilla', origin: 'Local', ibu: 0, abv: 0, priceHalf: 6500, pricePint: 6500, onTap: true },
    { name: 'MUNDO TRAMBOLICO', description: 'ASTOR - DOBLE NEIPA', style: 'Canilla', origin: 'Local', ibu: 0, abv: 0, priceHalf: 7000, pricePint: 7000, onTap: true },
    { name: 'AMBAR', description: 'MUR - AMBER ALE', style: 'Canilla', origin: 'Local', ibu: 0, abv: 0, priceHalf: 5500, pricePint: 5500, onTap: true },
    { name: 'ROBUST PORTER', description: 'ASTOR - PORTER', style: 'Canilla', origin: 'Local', ibu: 0, abv: 0, priceHalf: 5500, pricePint: 5500, onTap: true },

    // en Botella (Barrel Aged)
    { name: 'LA VUELTA DEL 420', description: 'ASTOR - GINGER CON SESSION IPA', style: 'Botella Barrel Aged', origin: 'Local', ibu: 0, abv: 0, priceHalf: 20000, pricePint: 20000, onTap: false },
    { name: 'COSA SALVAJE', description: 'ASTOR - GOLDEN SOUR Y ORUJO DE BONARDA', style: 'Botella Barrel Aged', origin: 'Local', ibu: 0, abv: 0, priceHalf: 24000, pricePint: 24000, onTap: false },
    { name: 'CONJETURA DIVERGENTE', description: 'OKCIDENTA - OUD BRUIN', style: 'Botella Barrel Aged', origin: 'Local', ibu: 0, abv: 0, priceHalf: 20000, pricePint: 20000, onTap: false },
    { name: 'ESTUPIDO Y SENSUAL', description: 'OKCIDENTA - FLANDERS RED', style: 'Botella Barrel Aged', origin: 'Local', ibu: 0, abv: 0, priceHalf: 20500, pricePint: 20500, onTap: false },
    { name: 'JOYA PERDIDA', description: 'OKCIDENTA - BARLEY WINE', style: 'Botella Barrel Aged', origin: 'Local', ibu: 0, abv: 0, priceHalf: 20000, pricePint: 20000, onTap: false },
    { name: 'ORDEN PARALELO', description: 'OKCIDENTA - AMERICAN BARLEY WINE', style: 'Botella Barrel Aged', origin: 'Local', ibu: 0, abv: 0, priceHalf: 21000, pricePint: 21000, onTap: false },
    { name: 'PARADOJA NOCTURNA', description: 'OKCIDENTA - IMPERIAL STOUT', style: 'Botella Barrel Aged', origin: 'Local', ibu: 0, abv: 0, priceHalf: 23000, pricePint: 23000, onTap: false },
  ];
  await prisma.beer.createMany({ data: beersData });

  console.log('🎉 Seed complete!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
