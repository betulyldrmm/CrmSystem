CRM Optimizasyon Sistemi
Bu proje, bir CRM (Müşteri İlişkileri Yönetimi) sisteminin iki temel işlevini optimize etmek için geliştirilmiştir:
1.	Müşteri Destek Temsilcisi Yönlendirme: CRM sistemi, müşteri destek temsilcilerini belirli bir şehirdeki müşterilere yönlendirmek için optimize edilmiştir.
2.	Pazarlama Kampanyası Seçimi: CRM sistemi, bütçe kısıtları altında maksimum yatırım getirisi (ROI) sağlamak için en uygun pazarlama kampanyalarını seçmektedir.
Her iki işlev de Dinamik Programlama yaklaşımı kullanılarak optimize edilmiştir.
Kullanılan Teknolojiler
•	JavaScript
•	HTML5
•	CSS3
•	Chart.js (grafikler için)
Dinamik Programlama Algoritmaları
1. Müşteri Destek Temsilcisi Yönlendirme - Macar Algoritması (Hungarian Algorithm)
Müşteri Destek Temsilcisi Yönlendirme problemi, bir atama problemi olarak modellenmiştir. Bu problem, Ma

CRM Optimizasyon Sistemi Projesi
Proje Amacı
Bu proje, bir CRM (Müşteri İlişkileri Yönetimi) sistemini optimize etmek için dinamik programlama tekniklerini kullanarak iki temel işlevi geliştirmeyi amaçlamaktadır:
1.	Müşteri Destek Temsilcisi Yönlendirme: Müşteri destek temsilcilerini, müşterilerin taleplerine ve temsilcilerin uygunluğuna göre optimize edilmiş bir şekilde yönlendirmek.
2.	Pazarlama Kampanyası Seçimi: Belirli bir bütçe kısıtlaması altında, maksimum yatırım getirisi (ROI) sağlayacak en uygun pazarlama kampanyalarını seçmek.
Kullanılan Algoritmalar
1. Macar Algoritması (Hungarian Algorithm)
Amacı: Müşteri destek temsilcilerini müşterilere optimal şekilde atamak.
Çalışma Prensibi:
•	Temsilciler ve müşteriler arasındaki eşleşme maliyetlerini içeren bir matris oluşturulur.
•	Algoritma, toplam maliyeti minimize eden bir eşleşme bulmaya çalışır.
•	Adım adım olarak: 
1.	Satır ve sütun indirgeme
2.	Sıfır elemanlarını bulma
3.	Minimum çizgi sayısını hesaplama
4.	Optimal eşleşmeyi bulma
Zaman Karmaşıklığı: O(n³) - n: temsilci veya müşteri sayısı (hangisi daha fazlaysa) Alan Karmaşıklığı: O(n²) - maliyet matrisi için
2. Sırt Çantası Problemi (Knapsack Problem)
Amacı: Bütçe kısıtlaması altında maksimum ROI sağlayacak kampanyaları seçmek.
Çalışma Prensibi:
•	Her kampanyanın bir maliyeti ve beklenen getirisi (ROI) vardır.
•	Algoritma, toplam bütçeyi aşmadan maksimum ROI sağlayacak kampanya kombinasyonunu bulmaya çalışır.
•	Adım adım olarak: 
1.	Dinamik programlama tablosu oluşturma
2.	Tabloyu doldurma (her alt problem için en iyi çözümü hesaplama)
3.	Optimal çözümü geri izleme
Zaman Karmaşıklığı: O(nW) - n: kampanya sayısı, W: toplam bütçe Alan Karmaşıklığı: O(nW) - dinamik programlama tablosu için
Dinamik Programlamanın Diğer Algoritma Tasarım Yaklaşımlarından Farkı
1.	Optimal Alt Yapı: Dinamik programlama, problemin optimal çözümünün, alt problemlerin optimal çözümlerinden oluştuğu prensibiyle çalışır.
2.	Örtüşen Alt Problemler: Aynı alt problemlerin tekrar tekrar çözülmesi gereken durumlarda, dinamik programlama bu çözümleri hafızada saklayarak hesaplama verimliliğini artırır.
3.	Tablo Tabanlı Yaklaşım: Sonuçları bir tabloda saklar, böylece daha sonra gereken hesaplamalarda tekrar kullanılabilir.
4.	Brüt Kuvvet ile Karşılaştırma: Brüt kuvvet (tüm olasılıkları deneme) O(2^n) karmaşıklığına sahipken, dinamik programlama çözümü genellikle O(n*W) gibi daha verimli bir karmaşıklığa sahiptir.
5.	Greedy Algoritmalar ile Karşılaştırma: Greedy algoritmalar her adımda en iyi seçimi yapar, ancak global optimum sonucu garanti etmez. Dinamik programlama ise her alt problem için optimal çözümü bularak global optimum sonuca ulaşır.
Proje Bileşenleri
1.	CRMSystem Sınıfı: Temel algoritmaları ve fonksiyonları içerir.
2.	Müşteri Temsilcisi Atama Modülü: Macar Algoritması implementasyonu.
3.	Kampanya Seçim Modülü: Sırt Çantası Problemi implementasyonu.
4.	Test Veri Üreteci: Rastgele test verileri oluşturur.
5.	Performans Analizi: Algoritmaların farklı veri boyutlarında performansını ölçer.
6.	Kullanıcı Arayüzü: Sonuçları görsel olarak sunar.
Beklenen Çıktılar
1.	Müşteri temsilcileri ve müşteriler arasındaki optimal eşleşmeler.
2.	Seçilen pazarlama kampanyaları ve bunların beklenen getirileri.
3.	Algoritmaların zaman ve alan karmaşıklığı analizi.
4.	Performans grafikleri ve ölçümleri.
