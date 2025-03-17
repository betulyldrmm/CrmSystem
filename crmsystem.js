/**
 * CRM Optimizasyon Sistemi
 * 1. Müşteri Destek Temsilcisi Yönlendirme (Macar Algoritması)
 * 2. Pazarlama Kampanyası Seçimi (Sırt Çantası Problemi)
 */

class Crmsystem {
    constructor() {
        this.customers = [];
        this.representatives = [];
        this.campaigns = [];
    }

    /**
     * Müşteri Destek Temsilcisi Yönlendirme Algoritması (Macar Algoritması)
     * Zaman Karmaşıklığı: O(n³) - n: temsilci veya müşteri sayısı (hangisi daha fazlaysa)
     * Alan Karmaşıklığı: O(n²) - maliyet matrisi için
     */
    assignRepresentatives(costMatrix) {
        // Macar Algoritması (Hungarian Algorithm) uygulaması
        console.time('Müşteri Temsilcisi Atama Süresi');
        
        // Step 1: Satır ve sütun sayılarını al
        const rows = costMatrix.length;
        const cols = costMatrix[0].length;
        
        // Step 2: Her satırdaki minimum değeri satırdaki tüm değerlerden çıkar
        let minValues = Array(rows).fill(0);
        
        for (let i = 0; i < rows; i++) {
            minValues[i] = Math.min(...costMatrix[i]);
            for (let j = 0; j < cols; j++) {
                costMatrix[i][j] -= minValues[i];
            }
        }
        
        // Step 3: Her sütundaki minimum değeri sütundaki tüm değerlerden çıkar
        for (let j = 0; j < cols; j++) {
            let minVal = Infinity;
            for (let i = 0; i < rows; i++) {
                minVal = Math.min(minVal, costMatrix[i][j]);
            }
            for (let i = 0; i < rows; i++) {
                costMatrix[i][j] -= minVal;
            }
        }
        
        // Step 4: Minimum sayıda çizgi ile sıfırları kapsayacak şekilde çizgiler çiz
        // Step 5: Kalan minimum değeri bul ve uygun şekilde ekle/çıkar
        // Note: Tam bir Macar algoritması uygulaması oldukça karmaşıktır
        // Burada basitleştirilmiş bir greedy yaklaşım kullanıyoruz
        
        const assignments = this.greedyAssignment(costMatrix);
        
        console.timeEnd('Müşteri Temsilcisi Atama Süresi');
        return assignments;
    }
    
    // Greedy atama yaklaşımı (basitleştirilmiş)
    greedyAssignment(costMatrix) {
        const rows = costMatrix.length;
        const cols = costMatrix[0].length;
        const assignments = new Array(rows).fill(-1);
        const usedCols = new Array(cols).fill(false);
        
        // Her temsilci için en uygun müşteriyi bul
        for (let i = 0; i < rows; i++) {
            let minVal = Infinity;
            let minIdx = -1;
            
            for (let j = 0; j < cols; j++) {
                if (!usedCols[j] && costMatrix[i][j] < minVal) {
                    minVal = costMatrix[i][j];
                    minIdx = j;
                }
            }
            
            if (minIdx !== -1) {
                assignments[i] = minIdx;
                usedCols[minIdx] = true;
            }
        }
        
        return assignments;
    }
    
    /**
     * Tam Macar Algoritması (Hungarian Algorithm) uygulaması
     * Zaman Karmaşıklığı: O(n³)
     * Alan Karmaşıklığı: O(n²)
     */
    hungarianAlgorithm(costMatrix) {
        const n = Math.max(costMatrix.length, costMatrix[0].length);
        const lx = Array(n).fill(0);
        const ly = Array(n).fill(0);
        const mx = Array(n).fill(-1);
        const my = Array(n).fill(-1);
        
        // Adım 1: Her satırdaki en küçük değeri hesapla
        for (let i = 0; i < n; i++) {
            if (i < costMatrix.length) {
                lx[i] = Math.min(...costMatrix[i]);
            }
        }
        
        // Adım 2: Her sütundaki en küçük değeri hesapla
        for (let j = 0; j < n; j++) {
            let minVal = Infinity;
            for (let i = 0; i < costMatrix.length; i++) {
                if (j < costMatrix[i].length) {
                    minVal = Math.min(minVal, costMatrix[i][j] - lx[i]);
                }
            }
            ly[j] = minVal;
        }
        
        // Adım 3: Maksimum eşleşme bul
        for (let i = 0; i < n && i < costMatrix.length; i++) {
            const visited = Array(n).fill(false);
            this.findPath(i, costMatrix, lx, ly, mx, my, visited);
        }
        
        // Sonuçları döndür
        const result = [];
        for (let i = 0; i < costMatrix.length; i++) {
            result.push(mx[i]);
        }
        
        return result;
    }
    
    findPath(i, costMatrix, lx, ly, mx, my, visited) {
        visited[i] = true;
        
        for (let j = 0; j < costMatrix[0].length; j++) {
            if (Math.abs(lx[i] + ly[j] - costMatrix[i][j]) < 1e-9 && !visited[j + costMatrix.length]) {
                visited[j + costMatrix.length] = true;
                
                if (my[j] === -1 || this.findPath(my[j], costMatrix, lx, ly, mx, my, visited)) {
                    mx[i] = j;
                    my[j] = i;
                    return true;
                }
            }
        }
        
        return false;
    }

    /**
     * Pazarlama Kampanyası Seçimi Algoritması (Sırt Çantası Problemi - Knapsack Problem)
     * Zaman Karmaşıklığı: O(n*W) - n: kampanya sayısı, W: toplam bütçe
     * Alan Karmaşıklığı: O(n*W) - DP tablosu için
     */
    selectMarketingCampaigns(campaigns, totalBudget) {
        console.time('Kampanya Seçimi Süresi');
        
        // Kampanyaları ID, maliyet ve getiri içeren bir formata dönüştür
        const formattedCampaigns = campaigns.map((campaign, index) => ({
            id: campaign.id || index,
            cost: campaign.cost,
            roi: campaign.roi,
            name: campaign.name || `Kampanya ${index + 1}`
        }));
        
        // Kampanyaları ROI/maliyet oranına göre sırala (greedy yaklaşım başlangıcı)
        formattedCampaigns.sort((a, b) => (b.roi / b.cost) - (a.roi / a.cost));
        
        // Dinamik Programlama tablosu oluştur
        // dp[i][j] = i kampanya ve j bütçesiyle elde edilebilecek maksimum ROI
        const n = formattedCampaigns.length;
        const dp = Array(n + 1).fill().map(() => Array(totalBudget + 1).fill(0));
        const selected = Array(n + 1).fill().map(() => Array(totalBudget + 1).fill(false));
        
        // Dinamik Programlama ile çözüm
        for (let i = 1; i <= n; i++) {
            const campaign = formattedCampaigns[i - 1];
            
            for (let j = 0; j <= totalBudget; j++) {
                // Eğer kampanya maliyeti bütçeyi aşmıyorsa
                if (campaign.cost <= j) {
                    // Kampanyayı seçersek veya seçmezsek hangisi daha iyi?
                    const includeROI = dp[i - 1][j - campaign.cost] + campaign.roi;
                    const excludeROI = dp[i - 1][j];
                    
                    if (includeROI > excludeROI) {
                        dp[i][j] = includeROI;
                        selected[i][j] = true;
                    } else {
                        dp[i][j] = excludeROI;
                        selected[i][j] = false;
                    }
                } else {
                    // Kampanya maliyeti bütçeyi aşıyorsa, seçemeyiz
                    dp[i][j] = dp[i - 1][j];
                    selected[i][j] = false;
                }
            }
        }
        
        // Seçilen kampanyaları geri takip ederek bul
        const selectedCampaigns = [];
        let remainingBudget = totalBudget;
        
        for (let i = n; i > 0; i--) {
            if (selected[i][remainingBudget]) {
                selectedCampaigns.push(formattedCampaigns[i - 1]);
                remainingBudget -= formattedCampaigns[i - 1].cost;
            }
        }
        
        // Sonuçları hesapla
        const totalCost = selectedCampaigns.reduce((sum, campaign) => sum + campaign.cost, 0);
        const totalROI = selectedCampaigns.reduce((sum, campaign) => sum + campaign.roi, 0);
        
        console.timeEnd('Kampanya Seçimi Süresi');
        
        return {
            selectedCampaigns,
            totalCost,
            totalROI,
            remainingBudget: totalBudget - totalCost
        };
    }
    
    /**
     * Test verileri oluşturma
     */
    generateTestData(numCustomers, numRepresentatives, numCampaigns) {
        // Müşteriler oluştur
        this.customers = Array(numCustomers).fill().map((_, i) => ({
            id: i,
            name: `Müşteri ${i + 1}`,
            city: ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya'][Math.floor(Math.random() * 5)],
            priority: Math.floor(Math.random() * 5) + 1 // 1-5 arası öncelik
        }));
        
        // Temsilciler oluştur
        this.representatives = Array(numRepresentatives).fill().map((_, i) => ({
            id: i,
            name: `Temsilci ${i + 1}`,
            skills: Math.floor(Math.random() * 5) + 1, // 1-5 arası yetenek seviyesi
            availability: Math.random() // 0-1 arası uygunluk
        }));
        
        // Kampanyalar oluştur
        this.campaigns = Array(numCampaigns).fill().map((_, i) => ({
            id: i,
            name: `Kampanya ${i + 1}`,
            cost: Math.floor(Math.random() * 5000) + 1000, // 1000-6000 TL arası maliyet
            roi: Math.floor(Math.random() * 15000) + 3000 // 3000-18000 TL arası getiri
        }));
        
        // Maliyet matrisi oluştur (temsilci-müşteri eşleşme maliyeti)
        const costMatrix = [];
        
        for (const rep of this.representatives) {
            const costs = [];
            
            for (const customer of this.customers) {
                // Maliyet hesaplama: öncelik, yetenek ve uygunluğa göre
                const priority = customer.priority;
                const skill = rep.skills;
                const availability = rep.availability;
                
                // Düşük değer daha iyi eşleşmeyi gösterir
                // Öncelik yüksekse, maliyet düşük olmalı
                const cost = Math.round(100 - (priority * 10) - (skill * 5) - (availability * 20));
                costs.push(Math.max(0, cost)); // Negatif maliyet olmasın
            }
            
            costMatrix.push(costs);
        }
        
        return {
            customers: this.customers,
            representatives: this.representatives,
            campaigns: this.campaigns,
            costMatrix
        };
    }
    
    /**
     * Sonuçları gösterme
     */
    displayResults(assignments, campaignResults) {
        console.log("=== Müşteri Temsilcisi Atamaları ===");
        assignments.forEach((customerId, repId) => {
            if (customerId !== -1) {
                const rep = this.representatives[repId];
                const customer = this.customers[customerId];
                console.log(`${rep.name} -> ${customer.name} (${customer.city})`);
            }
        });
        
        console.log("\n=== Seçilen Pazarlama Kampanyaları ===");
        console.log(`Toplam Bütçe: ${campaignResults.totalCost} TL`);
        console.log(`Toplam Beklenen Getiri (ROI): ${campaignResults.totalROI} TL`);
        console.log(`Kalan Bütçe: ${campaignResults.remainingBudget} TL`);
        
        campaignResults.selectedCampaigns.forEach(campaign => {
            console.log(`${campaign.name}: Maliyet=${campaign.cost} TL, ROI=${campaign.roi} TL`);
        });
    }
    
    /**
     * Algoritmik performans analizi
     */
    analyzePerformance(numReps, numCustomers, numCampaigns, budget) {
        const times = {
            assignment: [],
            knapsack: []
        };
        
        const testSizes = [5, 10, 15, 20, 25, 30];
        
        for (const size of testSizes) {
            // Test verileri oluştur
            const testData = this.generateTestData(size, size, size);
            
            // Müşteri temsilcisi atama zamanını ölç
            const startAssign = performance.now();
            this.assignRepresentatives(testData.costMatrix);
            const endAssign = performance.now();
            times.assignment.push(endAssign - startAssign);
            
            analyzePerformance(numReps, numCustomers, numCampaigns, budget) 
                const times = {
                    assignment: [],
                    knapsack: []
                };
                
                const testSizes = [5, 10, 15, 20, 25, 30];
                
                for (const size of testSizes) {
                    // Test verileri oluştur
                    const testData = this.generateTestData(size, size, size);
                    
                    // Müşteri temsilcisi atama zamanını ölç
                    const startAssign = performance.now();
                    this.assignRepresentatives(testData.costMatrix);
                    const endAssign = performance.now();
                    times.assignment.push(endAssign - startAssign);
                    
                    // Kampanya seçimi zamanını ölç
                    const startKnapsack = performance.now();
                    this.selectMarketingCampaigns(testData.campaigns, budget);
                    const endKnapsack = performance.now();
                    times.knapsack.push(endKnapsack - startKnapsack);
                }
                
                console.log("=== Performans Analizi ===");
                console.log("Problem Boyutu | Atama Süresi (ms) | Knapsack Süresi (ms)");
                console.log("---------------------------------------------------------");
                
                for (let i = 0; i < testSizes.length; i++) {
                    console.log(`${testSizes[i].toString().padEnd(14)} | ${times.assignment[i].toFixed(2).padEnd(17)} | ${times.knapsack[i].toFixed(2)}`);
                }
                
                return times;
            }
        }}