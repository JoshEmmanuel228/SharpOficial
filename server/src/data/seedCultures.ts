import Culture from '../models/Culture';
import connectDB from '../config/db';
import dotenv from 'dotenv';

dotenv.config();

const reggaeData = {
    name: 'Reggae',
    slug: 'reggae',
    description: 'La cultura del reggae es un fenómeno musical y social que nació en Jamaica a finales de los años 60, fusionando ritmos previos como el ska y el rocksteady con influencias del rhythm and blues, jazz y música caribeña. Se caracteriza por sus letras con mensajes sociales, políticos y espirituales, a menudo de protesta y búsqueda de unidad ("un amor"), y está fuertemente asociada a la cultura rastafari, aunque trasciende este movimiento. Su impacto se ha globalizado, influyendo en géneros como el punk rock, el hip-hop y el pop, y es reconocida por la UNESCO como patrimonio cultural inmaterial.',
    characteristics: {
        origins: [
            'Surgió en los guetos de Kingston, Jamaica, como una expresión de las realidades sociales y problemas de la época, incluyendo la pobreza y la opresión.'
        ],
        connection: 'La cultura rastafari es una parte fundamental del reggae, con su énfasis en la espiritualidad, la paz, la unidad y la figura del emperador Haile Selassie I de Etiopía.',
        themes: [
            'Injusticia social',
            'Resistencia',
            'Amor',
            'Libertad',
            'Igualdad',
            'Pobreza',
            'Conexión con la naturaleza'
        ],
        musicalStyle: 'Se distingue por su ritmo lento y sincopado (el "latido del corazón"), con instrumentos como el bajo, la guitarra, la batería y la percusión como pilares fundamentales.',
        globalInfluence: 'Desde su surgimiento, ha tenido una enorme influencia cultural en todo el mundo, impactando en géneros musicales, movimientos contraculturales (como el movimiento skinhead en el Reino Unido), y el desarrollo del hip-hop.'
    },
    impact: {
        unesco: 'El reggae es reconocido por la UNESCO como parte del patrimonio cultural inmaterial de la humanidad, valorando su fuerza intelectual, sociopolítica y espiritual.',
        culturalIdentity: 'Se convirtió en un símbolo de identidad para Jamaica y ha ayudado a mejorar la imagen del país internacionalmente.',
        evolution: 'Ha evolucionado a lo largo del tiempo, dando lugar a subgéneros como el dancehall, y en la actualidad sigue reinventándose y fusionándose con otros ritmos.'
    },
    headerImage: '',
    gallery: []
};

const punkData = {
    name: 'Punk',
    slug: 'punk',
    description: 'La cultura punk es un movimiento contracultural y musical que surgió a mediados de la década de 1970, caracterizado por una actitud rebelde y antisistema, la libertad individual y la ética del "hazlo tú mismo" (DIY).',
    characteristics: {
        origins: [
            'Surgido en Estados Unidos y el Reino Unido a mediados de los años 70, el punk fue una respuesta social y política a las normas establecidas, la desigualdad económica y la cultura dominante de la época.'
        ],
        connection: 'La filosofía punk se basa en el rechazo a la autoridad, adoptando posturas impopulares y negándose a seguir los valores tradicionales modernos. Su actitud antisistema promueve el inconformismo y la oposición al orden establecido.',
        themes: [
            'Libertad individual',
            'Autoexpresión',
            'Rechazo a la autoridad',
            'Antisistema',
            'Inconformismo',
            'Autenticidad',
            'Ética DIY (hazlo tú mismo)'
        ],
        musicalStyle: 'El punk rock se distingue por su sonido crudo, directo y enérgico. Las canciones suelen ser cortas, rápidas y con estructuras musicales simples, a menudo con un enfoque minimalista que evita los escenarios elaborados del rock convencional. Bandas como los Ramones y The Stooges en EE. UU. fueron pioneras influyentes del género.',
        globalInfluence: 'El punk ha influenciado profundamente la música, la moda y el arte contemporáneo. Su ética DIY enfatiza la producción independiente de música, ropa y arte, rechazando la propiedad corporativa y el consumismo. La moda punk es una declaración audaz diseñada para impactar y desafiar las normas sociales, con peinados llamativos (mohicanos), ropa rasgada, y accesorios metálicos.'
    },
    impact: {
        unesco: 'El arte visual punk utiliza técnicas como el collage, empleando letras recortadas de periódicos y revistas para sus fanzines y portadas de discos, un recurso que evoca las notas de rescate y que previamente se asoció con el dadaísmo.',
        culturalIdentity: 'La estética punk incluye imagen atrevida con peinados llamativos, ropa rasgada o personalizada, chaquetas de cuero y una paleta de colores limitada a tonos oscuros como el negro y el gris. Muchos punks prefieren la ropa de segunda mano y materiales reutilizados como forma de oponerse al consumismo de la moda de producción masiva.',
        evolution: 'El arte punk se considera una forma de acción directa y revolución, buscando cambiar la realidad y expresar una dimensión política. El movimiento continúa evolucionando, manteniendo vivos sus valores de autenticidad, independencia y resistencia al sistema.'
    },
    headerImage: '',
    gallery: []
};

const skinheadData = {
    name: 'Skinhead',
    slug: 'skinhead',
    description: 'La cultura skinhead surgió a finales de la década de 1960 en el Reino Unido como un movimiento de la clase trabajadora, inicialmente apolítico y multicultural, fusionando la estética británica mod con la música y el estilo de los "rude boys" jamaicanos. Con el tiempo, el movimiento se fragmentó ideológicamente.',
    characteristics: {
        origins: [
            'El movimiento skinhead original nació de la interacción entre jóvenes obreros británicos y los inmigrantes jamaicanos que llegaron al Reino Unido en la posguerra. Compartían una identidad de clase trabajadora y gustos musicales.'
        ],
        connection: 'Adoptaron la estética elegante pero práctica de los mods (chaquetas Harrington, camisas Ben Sherman o Fred Perry) y la cultura de los "rude boys" jamaicanos. Se caracterizaban por un fuerte sentido de orgullo de clase, camaradería y, a menudo, una inclinación hacia la violencia callejera y el fútbol, pero inicialmente sin una agenda política racial.',
        themes: [
            'Orgullo de clase trabajadora',
            'Camaradería',
            'Identidad obrera',
            'Fútbol',
            'Música ska y reggae',
            'Unidad multicultural',
            'Spirit of \'69'
        ],
        musicalStyle: 'La música era un pilar central, con gran aprecio por el ska, el rocksteady y el early reggae (también conocido como skinhead reggae), con artistas como Symarip, Toots & The Maytals, y Desmond Dekker siendo muy populares. La etiqueta Trojan Records fue icónica.',
        globalInfluence: 'La vestimenta skinhead era distintiva y funcional, diseñada para la vida en los barrios obreros y los estadios de fútbol. Incluía botas Dr. Martens de 8 o 10 agujeros con punta de acero, camisas de cuadros o lisas con botones en el cuello, tirantes, vaqueros Levi\'s 501, chaquetas bomber o Harrington, y el característico cabello rapado o muy corto.'
    },
    impact: {
        unesco: 'Con el tiempo, la subcultura se diversificó ideológicamente. Muchos skinheads permanecieron apolíticos, enfocados en la música y la cultura original de 1960, conmemorada con el lema "Spirit of \'69".',
        culturalIdentity: 'La estética incluía calzado robusto (Dr. Martens), ropa práctica (camisas Ben Sherman, Fred Perry, tirantes, vaqueros Levi\'s 501), peinado rapado característico, y accesorios como chaquetas bomber, abrigos Crombie y pañuelos de seda con colores de equipos de fútbol.',
        evolution: 'A finales de los 70 y principios de los 80, en un contexto de crisis económica e inmigración, grupos de extrema derecha reclutaron a jóvenes skinheads, asociando la subcultura con el racismo en la percepción pública. Como respuesta, surgieron grupos antirracistas: SHARP (Skinheads Against Racial Prejudice) se formó para rechazar el racismo y promover la unidad, mientras que RASH (Red and Anarchist Skinheads) adoptó posturas comunistas o anarquistas militantes.'
    },
    headerImage: '',
    gallery: []
};

const rockData = {
    name: 'Rock',
    slug: 'rock',
    description: 'La cultura rock es un amplio movimiento sociocultural que se originó a mediados del siglo XX en Estados Unidos, estrechamente ligado al género musical del mismo nombre. Se caracteriza por un espíritu de rebeldía, la ruptura con las convenciones sociales establecidas y una influencia significativa en la moda, el arte y los valores sociales.',
    characteristics: {
        origins: [
            'El rock and roll surgió en la década de 1950 como una fusión del rhythm and blues, la música country, el blues eléctrico, el jazz y el góspel. Rápidamente se convirtió en un fenómeno juvenil, simbolizando el rechazo a las actitudes y expectativas de las generaciones anteriores y tendiendo puentes entre razas y clases sociales.'
        ],
        connection: 'Un valor fundamental es el desafío a la autoridad y la expresión de la individualidad. La cultura rock a menudo ha servido como vehículo para la crítica social y el cambio, fomentando un fuerte sentido de comunidad e identidad compartida entre sus seguidores que trasciende fronteras geográficas y sociales.',
        themes: [
            'Rebeldía',
            'Individualismo',
            'Desafío a la autoridad',
            'Crítica social',
            'Libertad de expresión',
            'Identidad compartida',
            'Cambio social'
        ],
        musicalStyle: 'El núcleo de la cultura rock está centrado tradicionalmente en la guitarra eléctrica amplificada, la batería y voces potentes. El ritmo fuerte y constante, a menudo en 4/4, es una característica distintiva. A lo largo de las décadas de 1960 y 1970, el rock evolucionó en múltiples subgéneros, incluyendo el rock psicodélico, el hard rock, el punk, el heavy metal y el rock progresivo, con bandas icónicas como The Beatles, Led Zeppelin y The Rolling Stones definiendo cada era.',
        globalInfluence: 'El estilo rockero rompe con la estética clásica, popularizando prendas atrevidas y urbanas como pantalones ajustados, chaquetas de cuero, botas militares y accesorios con tachuelas. Los logotipos de las bandas también son símbolos icónicos reconocidos internacionalmente. La capacidad del rock para fusionarse con otros estilos ha dado lugar a una inmensa variedad de subgéneros, cada uno con su propia estética y filosofía.'
    },
    impact: {
        unesco: 'El rock and roll surgió como fusión de rhythm and blues, country, blues eléctrico, jazz y góspel, tendiendo puentes entre razas y clases sociales. Se convirtió en un fenómeno juvenil que simbolizaba el rechazo a las actitudes de las generaciones anteriores.',
        culturalIdentity: 'La estética rock incluye pantalones ajustados, chaquetas de cuero, botas militares, accesorios con tachuelas y logotipos de bandas como símbolos icónicos. El rock ha fomentado un fuerte sentido de comunidad e identidad compartida entre sus seguidores, que trasciende fronteras geográficas y sociales.',
        evolution: 'La cultura rock va más allá de un simple estilo musical; representa un movimiento social y cultural duradero que ha dejado una huella indeleble en la historia moderna. Su capacidad para evolucionar y fusionarse con otros estilos ha dado lugar a una inmensa diversidad de subgéneros, cada uno con su propia estética y filosofía, desde el rock psicodélico hasta el heavy metal.'
    },
    headerImage: '',
    gallery: []
};

const cultures = [reggaeData, punkData, skinheadData, rockData];

const seedCultures = async () => {
    try {
        await connectDB();

        console.log('Cleaning existing cultures...');
        await Culture.deleteMany({});

        console.log('Seeding cultures...');
        await Culture.insertMany(cultures);

        console.log(`✅ Successfully seeded ${cultures.length} cultures: ${cultures.map(c => c.name).join(', ')}`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding cultures:', error);
        process.exit(1);
    }
};

seedCultures();
