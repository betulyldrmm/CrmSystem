// main.js
// CRM Sistemi için ana dosya

document.addEventListener('DOMContentLoaded', function() {
    const crmSystem = new Crmsystem();
    
    // Test verilerini oluştur
    const testData = crmSystem.generateTestData(10, 10, 15);
    
    // Müşteri temsilcisi atama işlemi
    const assignments = crmSystem.assignRepresentatives(testData.costMatrix);
    
    // Pazarlama kampanyası seçimi
    const budget = 50000; // 50,000 TL bütçe
    const campaignResults = crmSystem.selectMarketingCampaigns(testData.campaigns, budget);
    
    // Sonuçları göster
    crmSystem.displayResults(assignments, campaignResults);
    
    // Sonuçları UI'a yansıt
    displayResultsUI(testData, assignments, campaignResults);
    
    // Algoritma performans analizini çalıştır ve göster
    runPerformanceAnalysis(crmSystem);
});

// UI'da sonuçları gösterme fonksiyonu
function displayResultsUI(testData, assignments, campaignResults) {
    // Müşteri temsilcisi atamalarını göster
    const assignmentsList = document.getElementById('assignments-list');
    assignmentsList.innerHTML = '';
    
    assignments.forEach((customerId, repId) => {
        if (customerId !== -1) {
            const rep = testData.representatives[repId];
            const customer = testData.customers[customerId];
            
            const li = document.createElement('li');
            li.textContent = `${rep.name} -> ${customer.name} (${customer.city})`;
            assignmentsList.appendChild(li);
        }
    });
    
    // Kampanya sonuçlarını göster
    const campaignsList = document.getElementById('campaigns-list');
    campaignsList.innerHTML = '';
    
    document.getElementById('total-budget').textContent = campaignResults.totalCost + ' TL';
    document.getElementById('total-roi').textContent = campaignResults.totalROI + ' TL';
    document.getElementById('remaining-budget').textContent = campaignResults.remainingBudget + ' TL';
    
    campaignResults.selectedCampaigns.forEach(campaign => {
        const li = document.createElement('li');
        li.textContent = `${campaign.name}: Maliyet=${campaign.cost} TL, ROI=${campaign.roi} TL`;
        campaignsList.appendChild(li);
    });
}

// Algoritma performans analizini çalıştırma ve gösterme
function runPerformanceAnalysis(crmSystem) {
    const sizes = [5, 10, 15, 20, 25, 30];
    const assignmentTimes = [];
    const knapsackTimes = [];
    
    for (const size of sizes) {
        const testData = crmSystem.generateTestData(size, size, size);
        
        // Müşteri temsilcisi atama zamanını ölç
        const startAssign = performance.now();
        crmSystem.assignRepresentatives(testData.costMatrix);
        const endAssign = performance.now();
        assignmentTimes.push(endAssign - startAssign);
        
        // Kampanya seçimi zamanını ölç
        const budget = size * 5000;
        const startKnapsack = performance.now();
        crmSystem.selectMarketingCampaigns(testData.campaigns, budget);
        const endKnapsack = performance.now();
        knapsackTimes.push(endKnapsack - startKnapsack);
    }
    
    // Sonuçları göster
    displayPerformanceResults(sizes, assignmentTimes, knapsackTimes);
}

// Performans sonuçlarını gösterme
function displayPerformanceResults(sizes, assignmentTimes, knapsackTimes) {
    console.log("=== Performans Analizi ===");
    console.log("Problem Boyutu | Atama Süresi (ms) | Knapsack Süresi (ms)");
    console.log("------------------------------------------------------");
    
    for (let i = 0; i < sizes.length; i++) {
        console.log(`${sizes[i].toString().padStart(14)} | ${assignmentTimes[i].toFixed(2).padStart(17)} | ${knapsackTimes[i].toFixed(2).padStart(19)}`);
    }
    
    // Teorik karmaşıklık analizi
    console.log("\n=== Teorik Karmaşıklık Analizi ===");
    console.log("Müşteri Temsilcisi Atama (Macar Algoritması):");
    console.log("- Zaman Karmaşıklığı: O(n³)");
    console.log("- Alan Karmaşıklığı: O(n²)");
    
    console.log("\nPazarlama Kampanyası Seçimi (Sırt Çantası Problemi):");
    console.log("- Zaman Karmaşıklığı: O(n*W) - n: kampanya sayısı, W: toplam bütçe");
    console.log("- Alan Karmaşıklığı: O(n*W)");
}

// Basit grafik çizimi için fonksiyon
function drawChart(canvasId, labels, data, title) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}