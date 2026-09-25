<!DOCTYPE html>
<html lang="fr" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Silver Phoenix — Calculateur de ressources</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        phoenix: {
                            50: '#fff7ed',
                            100: '#ffedd5',
                            500: '#f97316',
                            600: '#ea580c',
                            700: '#c2410c',
                            glow: '#ff6b00'
                        },
                        silver: {
                            100: '#f1f5f9',
                            300: '#cbd5e1',
                            400: '#94a3b8',
                            700: '#334155',
                            800: '#1e293b',
                            900: '#0f172a',
                            950: '#090d16'
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        mono: ['JetBrains Mono', 'monospace']
                    }
                }
            }
        }
    </script>
    <!-- FontAwesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #090d16;
            color: #f1f5f9;
            background-image: 
                radial-gradient(circle at 15% 15%, rgba(249, 115, 22, 0.05) 0%, transparent 40%),
                radial-gradient(circle at 85% 85%, rgba(51, 65, 85, 0.15) 0%, transparent 40%);
            background-attachment: fixed;
        }
        .phoenix-border {
            border-image: linear-gradient(to right, #ea580c, #cbd5e1, #ea580c) 1;
        }
        .phoenix-glow {
            box-shadow: 0 0 15px rgba(249, 115, 22, 0.2);
        }
        .phoenix-glow:hover {
            box-shadow: 0 0 25px rgba(249, 115, 22, 0.35);
        }
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #0f172a;
        }
        ::-webkit-scrollbar-thumb {
            background: #334155;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #f97316;
        }
    </style>
</head>
<body class="min-h-screen flex flex-col">

    <header class="border-b border-silver-800 bg-silver-950/80 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-phoenix-500 to-phoenix-700 flex items-center justify-center text-white shadow-lg shadow-phoenix-500/20">
                    <i class="fa-solid fa-fire-flame-curved text-xl"></i>
                </div>
                <div>
                    <span class="text-xs font-semibold tracking-widest text-phoenix-500 uppercase block">Groupe Mercenaire</span>
                    <h1 class="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                        SILVER PHOENIX <span class="text-xs font-normal text-silver-400 bg-silver-800 px-2 py-0.5 rounded border border-silver-700">Calculateur v2.0</span>
                    </h1>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <button id="btnResetAll" class="px-3 py-1.5 text-xs font-medium text-silver-400 hover:text-white bg-silver-900 hover:bg-silver-800 border border-silver-700 rounded-lg transition-all flex items-center gap-2">
                    <i class="fa-solid fa-rotate-left"></i> <span class="hidden sm:inline">Réinitialiser</span>
                </button>
                <button id="btnExportDiscord" class="px-3 py-1.5 text-xs font-medium text-white bg-phoenix-600 hover:bg-phoenix-500 rounded-lg transition-all shadow-md shadow-phoenix-600/20 flex items-center gap-2">
                    <i class="fa-brands fa-discord"></i> <span>Exporter</span>
                </button>
            </div>
        </div>
    </header>

    <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <!-- Banner Intro -->
        <div class="bg-gradient-to-r from-silver-900 via-silver-800 to-silver-900 border border-silver-700/60 rounded-xl p-6 mb-8 relative overflow-hidden shadow-xl">
            <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-phoenix-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div class="relative z-10">
                <h2 class="text-xl font-bold text-white mb-1 flex items-center gap-2">
                    <i class="fa-solid fa-calculator text-phoenix-500"></i> Planification de fabrication
                </h2>
                <p class="text-silver-300 text-sm max-w-3xl">
                    Calcule tes besoins. Ajoute une ou plusieurs demandes. Pour chacune, choisis la catégorie, la référence et la quantité : les besoins sont calculés séparément puis additionnés dans le total général.
                </p>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <!-- Left Column: Form Requests (7 cols) -->
            <div class="lg:col-span-7 space-y-6">
                <div class="flex justify-between items-center">
                    <h3 class="text-md font-semibold text-silver-100 flex items-center gap-2">
                        <i class="fa-solid fa-list-check text-phoenix-500"></i> Demandes de fabrication (<span id="demandCount">1</span>)
                    </h3>
                    <button id="btnAddDemand" class="px-3 py-1.5 text-xs font-semibold text-phoenix-500 hover:text-white bg-phoenix-500/10 hover:bg-phoenix-600 border border-phoenix-500/30 hover:border-phoenix-600 rounded-lg transition-all flex items-center gap-1.5">
                        <i class="fa-solid fa-plus"></i> Ajouter une demande
                    </button>
                </div>

                <!-- Container for Dynamic Requests -->
                <div id="demandsContainer" class="space-y-4">
                    <!-- Dynamic Demand Cards inserted via JS -->
                </div>
            </div>

            <!-- Right Column: Summary & Total (5 cols) -->
            <div class="lg:col-span-5 space-y-6">
                <div class="sticky top-20">
                    <div class="bg-silver-900 border border-silver-800 rounded-xl p-5 shadow-2xl space-y-5">
                        
                        <!-- Header Total -->
                        <div class="flex justify-between items-center pb-4 border-b border-silver-800">
                            <div>
                                <span class="text-xs font-semibold text-phoenix-500 uppercase tracking-wider block">Résumé Global</span>
                                <h3 class="text-lg font-bold text-white">TOTAL DE TOUTES LES DEMANDES</h3>
                            </div>
                            <span id="badgeDemandTotal" class="text-xs bg-silver-800 text-silver-300 border border-silver-700 px-2.5 py-1 rounded-full font-mono">
                                1 demande
                            </span>
                        </div>

                        <!-- Resource Filters -->
                        <div class="flex items-center justify-between gap-2">
                            <span class="text-xs text-silver-400">Ressources requises</span>
                            <div class="relative flex-1 max-w-[180px]">
                                <i class="fa-solid fa-magnifying-glass absolute left-2.5 top-2.5 text-xs text-silver-500"></i>
                                <input type="text" id="searchResource" placeholder="Filtrer..." class="w-full bg-silver-950 text-xs border border-silver-800 rounded-lg pl-8 pr-2 py-1.5 text-silver-200 placeholder-silver-600 focus:outline-none focus:border-phoenix-500 transition-colors">
                            </div>
                        </div>

                        <!-- Total Resources Table -->
                        <div class="border border-silver-800 rounded-lg overflow-hidden bg-silver-950/50">
                            <table class="w-full text-left text-sm">
                                <thead class="bg-silver-800/80 text-silver-400 text-xs uppercase font-mono border-b border-silver-800">
                                    <tr>
                                        <th scope="col" class="py-2.5 px-4">Ressource</th>
                                        <th scope="col" class="py-2.5 px-4 text-right">Total Général</th>
                                    </tr>
                                </thead>
                                <tbody id="totalResourcesList" class="divide-y divide-silver-800/50">
                                    <!-- Dynamic Rows inserted via JS -->
                                </tbody>
                            </table>
                            <div id="emptyTotalState" class="hidden p-8 text-center text-silver-500 text-sm">
                                <i class="fa-solid fa-box-open text-3xl mb-2 text-silver-700 block"></i>
                                Aucune ressource nécessaire pour l'instant.
                            </div>
                        </div>

                        <!-- Quick Actions -->
                        <div class="pt-2">
                            <button id="btnCopySummary" class="w-full py-2.5 px-4 bg-silver-800 hover:bg-silver-700 text-silver-200 font-medium text-xs rounded-lg transition-colors border border-silver-700 flex items-center justify-center gap-2">
                                <i class="fa-regular fa-copy"></i> Copier le récapitulatif
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    </main>

    <!-- Notification Toast -->
    <div id="toast" class="fixed bottom-5 right-5 bg-silver-800 border border-phoenix-500 text-white px-4 py-3 rounded-xl shadow-2xl transform translate-y-20 opacity-0 transition-all duration-300 flex items-center gap-3 z-50 pointer-events-none">
        <i class="fa-solid fa-circle-check text-phoenix-500 text-lg"></i>
        <span id="toastMessage" class="text-sm">Action effectuée avec succès</span>
    </div>

    <script>
        // Database of Recipes and items
        const ITEM_DATABASE = [
            // Armes
            {
                id: 'epee_acier',
                name: 'Épée en Acier',
                category: 'Armes',
                icon: 'fa-sword',
                recipe: { 'Fer': 30, 'Acier': 45, 'Ruban Adhesif': 10 }
            },
            {
                id: 'fusil_assaut',
                name: 'Fusil d\'Assaut Tactique',
                category: 'Armes',
                icon: 'fa-gun',
                recipe: { 'Acier': 80, 'Plastique': 60, 'Composants Électroniques': 25, 'Ruban Adhesif': 20 }
            },
            {
                id: 'pistolet_plasma',
                name: 'Pistolet Plasma Silver',
                category: 'Armes',
                icon: 'fa-raygun',
                recipe: { 'Acier': 40, 'Plastique': 90, 'Composants Électroniques': 40, 'Cuivre': 35 }
            },

            // Armures
            {
                id: 'casque_tactique',
                name: 'Casque Tactique Renforcé',
                category: 'Armures',
                icon: 'fa-helmet-safety',
                recipe: { 'Acier': 35, 'Plastique': 50, 'Tissu': 40, 'Ruban Adhesif': 15 }
            },
            {
                id: 'gilet_pare_balles',
                name: 'Gilet Pare-balles Mercenaire',
                category: 'Armures',
                icon: 'fa-vest',
                recipe: { 'Fer': 60, 'Acier': 95, 'Plastique': 160, 'Tissu': 160, 'Ruban Adhesif': 60 }
            },
            {
                id: 'exosquelette',
                name: 'Exosquelette Phénix',
                category: 'Armures',
                icon: 'fa-user-shield',
                recipe: { 'Acier': 250, 'Plastique': 180, 'Cuivre': 120, 'Composants Électroniques': 90, 'Ruban Adhesif': 80 }
            },

            // Consommables
            {
                id: 'kit_soin',
                name: 'Kit de Soin d\'Urgence',
                category: 'Consommables',
                icon: 'fa-kit-medical',
                recipe: { 'Tissu': 30, 'Plastique': 15, 'Ruban Adhesif': 10 }
            },
            {
                id: 'chargeur_energie',
                name: 'Cellule d\'Énergie M4',
                category: 'Consommables',
                icon: 'fa-battery-full',
                recipe: { 'Cuivre': 20, 'Plastique': 25, 'Composants Électroniques': 10 }
            },

            // Équipement
            {
                id: 'radio_longue_portee',
                name: 'Émetteur Radio Crypté',
                category: 'Équipement',
                icon: 'fa-walkie-talkie',
                recipe: { 'Cuivre': 45, 'Plastique': 30, 'Composants Électroniques': 50, 'Ruban Adhesif': 15 }
            },
            {
                id: 'sac_tactique',
                name: 'Sac de Transport Lourd',
                category: 'Équipement',
                icon: 'fa-bag-shopping',
                recipe: { 'Tissu': 120, 'Ruban Adhesif': 25 }
            },

            // Construction
            {
                id: 'panneau_blindage',
                name: 'Panneau de Blindage Métallique',
                category: 'Construction',
                icon: 'fa-shield',
                recipe: { 'Fer': 100, 'Acier': 50 }
            },
            {
                id: 'tourelle_auto',
                name: 'Tourelle Automatique Sentry',
                category: 'Construction',
                icon: 'fa-tower-cell',
                recipe: { 'Fer': 150, 'Acier': 120, 'Composants Électroniques': 70, 'Cuivre': 60 }
            }
        ];

        // State Array holding active demands
        let demands = [];
        let nextDemandId = 1;

        const demandsContainer = document.getElementById('demandsContainer');
        const btnAddDemand = document.getElementById('btnAddDemand');
        const btnResetAll = document.getElementById('btnResetAll');
        const btnExportDiscord = document.getElementById('btnExportDiscord');
        const btnCopySummary = document.getElementById('btnCopySummary');
        const totalResourcesList = document.getElementById('totalResourcesList');
        const emptyTotalState = document.getElementById('emptyTotalState');
        const demandCountEl = document.getElementById('demandCount');
        const badgeDemandTotal = document.getElementById('badgeDemandTotal');
        const searchResourceInput = document.getElementById('searchResource');

        window.onload = function() {
            // Initial default demand matching user's prompt (Gilet Pare-balles sample)
            addDemand('Armures', 'gilet_pare_balles', 1);
            
            // Event Listeners
            btnAddDemand.addEventListener('click', () => addDemand());
            btnResetAll.addEventListener('click', resetAll);
            btnExportDiscord.addEventListener('click', exportToClipboard);
            btnCopySummary.addEventListener('click', exportToClipboard);
            searchResourceInput.addEventListener('input', calculateTotals);
        };

        function addDemand(defaultCategory = 'Armes', defaultItemId = '', defaultQty = 1) {
            const id = nextDemandId++;
            
            // Get available categories
            const categories = [...new Set(ITEM_DATABASE.map(item => item.category))];
            
            // First item in category as default if not specified
            const categoryItems = ITEM_DATABASE.filter(item => item.category === defaultCategory);
            const itemId = defaultItemId || (categoryItems.length > 0 ? categoryItems[0].id : ITEM_DATABASE[0].id);

            const demandObj = {
                id: id,
                category: defaultCategory,
                itemId: itemId,
                quantity: defaultQty
            };

            demands.push(demandObj);
            renderDemandCard(demandObj);
            updateDemandCounters();
            calculateTotals();
        }

        function removeDemand(id) {
            if (demands.length <= 1) {
                showToast("Au moins une demande doit rester active.", "warning");
                return;
            }
            demands = demands.filter(d => d.id !== id);
            const cardEl = document.getElementById(`demand-card-${id}`);
            if (cardEl) {
                cardEl.classList.add('opacity-0', 'scale-95');
                setTimeout(() => {
                    cardEl.remove();
                    updateDemandNumbersUI();
                    updateDemandCounters();
                    calculateTotals();
                }, 200);
            }
        }

        function resetAll() {
            demands = [];
            demandsContainer.innerHTML = '';
            nextDemandId = 1;
            addDemand('Armures', 'gilet_pare_balles', 1);
            showToast("Calculateur réinitialisé");
        }

        function updateDemandCounters() {
            demandCountEl.textContent = demands.length;
            badgeDemandTotal.textContent = `${demands.length} demande${demands.length > 1 ? 's' : ''} calculée${demands.length > 1 ? 's' : ''}`;
        }

        function updateDemandNumbersUI() {
            const cards = demandsContainer.querySelectorAll('.demand-card');
            cards.forEach((card, index) => {
                const titleSpan = card.querySelector('.demand-title');
                if (titleSpan) {
                    titleSpan.textContent = `Demande ${index + 1}`;
                }
            });
        }

        function renderDemandCard(demand) {
            const categories = [...new Set(ITEM_DATABASE.map(item => item.category))];
            
            const card = document.createElement('div');
            card.id = `demand-card-${demand.id}`;
            card.className = "demand-card bg-silver-900 border border-silver-800 hover:border-silver-700 rounded-xl p-5 shadow-lg transition-all duration-200";

            const itemsForCategory = ITEM_DATABASE.filter(i => i.category === demand.category);

            card.innerHTML = `
                <div class="flex items-center justify-between border-b border-silver-800 pb-3 mb-4">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-phoenix-500"></span>
                        <h4 class="text-sm font-semibold text-white tracking-wide uppercase font-mono demand-title">Demande ${demands.length}</h4>
                    </div>
                    <button class="btn-delete text-silver-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-silver-800 transition-colors text-xs" title="Supprimer la demande">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                    <!-- 1. Category Selection -->
                    <div class="md:col-span-4">
                        <label class="block text-xs font-medium text-silver-400 mb-1">1. Type d'objet</label>
                        <select class="select-category w-full bg-silver-950 border border-silver-700/80 rounded-lg text-xs text-white p-2.5 focus:border-phoenix-500 focus:outline-none transition-colors">
                            ${categories.map(cat => `<option value="${cat}" ${cat === demand.category ? 'selected' : ''}>${cat}</option>`).join('')}
                        </select>
                    </div>

                    <!-- 2. Item Selection -->
                    <div class="md:col-span-5">
                        <label class="block text-xs font-medium text-silver-400 mb-1">2. Référence</label>
                        <select class="select-item w-full bg-silver-950 border border-silver-700/80 rounded-lg text-xs text-white p-2.5 focus:border-phoenix-500 focus:outline-none transition-colors">
                            ${itemsForCategory.map(item => `<option value="${item.id}" ${item.id === demand.itemId ? 'selected' : ''}>${item.name}</option>`).join('')}
                        </select>
                    </div>

                    <!-- 3. Quantity Input -->
                    <div class="md:col-span-3">
                        <label class="block text-xs font-medium text-silver-400 mb-1">3. Quantité</label>
                        <div class="flex items-center">
                            <input type="number" min="1" max="999" value="${demand.quantity}" class="input-qty w-full bg-silver-950 border border-silver-700/80 rounded-lg text-xs text-white p-2.5 font-mono text-center focus:border-phoenix-500 focus:outline-none transition-colors">
                        </div>
                    </div>
                </div>

                <!-- Subtotal Resources for this specific Demand -->
                <div class="bg-silver-950/60 rounded-lg p-3 border border-silver-800/80">
                    <span class="text-[11px] font-medium text-silver-400 uppercase tracking-wider block mb-2">Besoins individuels pour cette demande :</span>
                    <div class="demand-resources flex flex-wrap gap-2 text-xs">
                        <!-- Dynamic resource tags inserted here -->
                    </div>
                </div>
            `;

            demandsContainer.appendChild(card);

            // Bind Event Listeners
            const selectCategory = card.querySelector('.select-category');
            const selectItem = card.querySelector('.select-item');
            const inputQty = card.querySelector('.input-qty');
            const btnDelete = card.querySelector('.btn-delete');

            selectCategory.addEventListener('change', (e) => {
                demand.category = e.target.value;
                // Update item dropdown options for selected category
                const filtered = ITEM_DATABASE.filter(i => i.category === demand.category);
                selectItem.innerHTML = filtered.map(item => `<option value="${item.id}">${item.name}</option>`).join('');
                demand.itemId = filtered[0] ? filtered[0].id : '';
                updateDemandCardResources(demand, card);
                calculateTotals();
            });

            selectItem.addEventListener('change', (e) => {
                demand.itemId = e.target.value;
                updateDemandCardResources(demand, card);
                calculateTotals();
            });

            inputQty.addEventListener('input', (e) => {
                const val = parseInt(e.target.value) || 1;
                demand.quantity = val < 1 ? 1 : val;
                updateDemandCardResources(demand, card);
                calculateTotals();
            });

            btnDelete.addEventListener('click', () => removeDemand(demand.id));

            // Initial render of resources badge for this card
            updateDemandCardResources(demand, card);
        }

        function updateDemandCardResources(demand, cardEl) {
            const resourceContainer = cardEl.querySelector('.demand-resources');
            const item = ITEM_DATABASE.find(i => i.id === demand.itemId);

            if (!item || !item.recipe) {
                resourceContainer.innerHTML = `<span class="text-silver-500 italic">Aucune recette sélectionnée</span>`;
                return;
            }

            let badgesHTML = '';
            for (const [resName, qty] of Object.entries(item.recipe)) {
                const totalNeeded = qty * demand.quantity;
                badgesHTML += `
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-silver-900 border border-silver-700/60 rounded-md text-silver-300">
                        <span class="font-semibold text-white font-mono">${totalNeeded}</span>
                        <span class="text-silver-400">unité</span>
                        <span class="text-phoenix-500 font-medium">${resName}</span>
                    </span>
                `;
            }
            resourceContainer.innerHTML = badgesHTML;
        }

        function calculateTotals() {
            const grandTotal = {};
            const filterTerm = searchResourceInput.value.toLowerCase().trim();

            // Sum resources across all active demands
            demands.forEach(demand => {
                const item = ITEM_DATABASE.find(i => i.id === demand.itemId);
                if (item && item.recipe) {
                    for (const [resName, qty] of Object.entries(item.recipe)) {
                        const amount = qty * demand.quantity;
                        grandTotal[resName] = (grandTotal[resName] || 0) + amount;
                    }
                }
            });

            // Filter entries if search query exists
            const filteredEntries = Object.entries(grandTotal).filter(([resName]) => 
                resName.toLowerCase().includes(filterTerm)
            );

            // Render Total Table
            totalResourcesList.innerHTML = '';

            if (filteredEntries.length === 0) {
                emptyTotalState.classList.remove('hidden');
                totalResourcesList.parentNode.classList.add('hidden');
            } else {
                emptyTotalState.classList.add('hidden');
                totalResourcesList.parentNode.classList.remove('hidden');

                filteredEntries.forEach(([resName, totalQty]) => {
                    const row = document.createElement('tr');
                    row.className = "hover:bg-silver-800/40 transition-colors";
                    row.innerHTML = `
                        <td class="py-2.5 px-4 font-medium text-silver-200 flex items-center gap-2">
                            <i class="fa-solid fa-cube text-phoenix-500 text-xs"></i>
                            ${resName}
                        </td>
                        <td class="py-2.5 px-4 text-right font-mono font-bold text-white">
                            ${totalQty} <span class="text-xs font-normal text-silver-400">unité${totalQty > 1 ? 's' : ''}</span>
                        </td>
                    `;
                    totalResourcesList.appendChild(row);
                });
            }
        }

        function exportToClipboard() {
            let exportText = `====================================\n`;
            exportText += `🔥 MERCENAIRE SILVER PHOENIX 🔥\n`;
            exportText += `📋 PLANIFICATION DE FABRICATION\n`;
            exportText += `====================================\n\n`;

            demands.forEach((demand, idx) => {
                const item = ITEM_DATABASE.find(i => i.id === demand.itemId);
                const itemName = item ? item.name : 'Inconnu';
                exportText += `Demande ${idx + 1} : ${demand.quantity}x ${itemName} (${demand.category})\n`;
            });

            exportText += `\n------------------------------------\n`;
            exportText += `📊 TOTAL DE TOUTES LES DEMANDES (${demands.length} demande${demands.length > 1 ? 's' : ''})\n`;
            exportText += `------------------------------------\n`;

            const grandTotal = {};
            demands.forEach(demand => {
                const item = ITEM_DATABASE.find(i => i.id === demand.itemId);
                if (item && item.recipe) {
                    for (const [resName, qty] of Object.entries(item.recipe)) {
                        grandTotal[resName] = (grandTotal[resName] || 0) + (qty * demand.quantity);
                    }
                }
            });

            for (const [resName, totalQty] of Object.entries(grandTotal)) {
                exportText += `- ${resName} : ${totalQty} unité${totalQty > 1 ? 's' : ''}\n`;
            }

            exportText += `====================================`;

            // Copy to clipboard fallback
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = exportText;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextArea);

            showToast("Récapitulatif copié dans le presse-papier !");
        }

        function showToast(message, type = "success") {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
            
            toastMessage.textContent = message;
            toast.classList.remove('translate-y-20', 'opacity-0');
            
            setTimeout(() => {
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 3000);
        }
    </script>
</body>
</html>
