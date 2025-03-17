CRM Optimizasyon Sistemi Projesi
Proje Amacı
Bu proje, bir CRM (Müşteri İlişkileri Yönetimi) sistemini optimize etmek için dinamik programlama tekniklerini kullanarak iki temel işlevi geliştirmeyi amaçlamaktadır:

Müşteri Destek Temsilcisi Yönlendirme: Müşteri destek temsilcilerini, kayıtlı taleplere ve temsilcilerin özelliklerine göre optimize edilmiş bir şekilde yönlendirmek.
Pazarlama Kampanyası Seçimi: Bütçe kısıtlaması altında, maksimum yatırım getirisi (ROI) sağlayacak en uygun pazarlama kampanyalarını seçmek.
Kullanılan Algoritmalar
Macar Algoritması (Hungarian Algorithm)

Amacı: Müşteri destek temsilcilerini optimal şekilde atamak.
Çalışma Prensibi: Temsilciler ve müşteriler arasındaki eşleşme maliyetlerini içeren bir matris oluşturulur. Algoritma, toplam maliyeti en aza indirecek şekilde bir eşleşme bulmaya çalışır.
Adımlar:
Satır ve sütun indirgeme
Sıfır elemanlarını bulma
Minimum çizgi hesaplamayı yapma
Optimal eşleşmeyi bulma
Zaman Karmaşıklığı: O(n³)
Alan Karmaşıklığı: O(n²)
Sırt Çantası Problemi (Knapsack Problem)

Amacı: Bütçe kısıtlaması altında maksimum yatırım getirisi sağlayacak kampanyaları seçmek.
Çalışma Prensibi: Her kampanyanın maliyeti ve beklenen getirisi (ROI) vardır. Algoritma, toplam bütçeyi aşmadan maksimum ROI sağlayacak kampanya kombinasyonunu bulmaya çalışır.
Adımlar:
Dinamik programlama tablosu oluşturma
Tabloyu doldurma (her alt problem için en iyi çözümü hesaplama)
Optimal çözümü geri izleme
Zaman Karmaşıklığı: O(nW)
Alan Karmaşıklığı: O(nW)
Dinamik Programlamanın Diğer Algoritma Tasarım Yaklaşımlarından Farkı
Optimal Alt Yapı: Dinamik programlama, problemin optimal çözümünün, alt problemlerin optimal çözümlerinden oluştuğu prensiple çalışır.
Örtüşen Alt Problemler: Aynı alt problemlerin tekrar tekrar çözülmesi gerektiğinde, dinamik programlama bu çözümleri hafızada saklayarak hesaplama verimliliğini artırır.
Tablo Tabanlı Yaklaşım: Sonuçlar bir tabloda saklanır, böylece daha sonra gereken hesaplamalar tekrar kullanılabilir.
Brüt Kuvvet ile Karşılaştırma: Brüt kuvvet (tüm olasılıkları deneme) O(2^n) karmaşıklığına sahipken, dinamik programlama çözümü genellikle O(n*W) gibi daha verimli bir karmaşıklığa sahiptir.
Greedy Algoritmalar ile Karşılaştırma: Greedy algoritmalar her adımda en iyi seçimi yapar, ancak global optimum sonucu garanti etmez. Dinamik programlama ise her alt problem için optimal çözümü bularak global optimuma ulaşır.
Proje Bileşenleri
CRMSystem Sınıfı: Temel algoritmalar ve fonksiyonları içerir.
Müşteri Temsilcisi Atama Modülü: Macar Algoritması implementasyonu.
Kampanya Seçim Modülü: Sırt Çantası Problemi implementasyonu.
Test Veri Üreteci: Rastgele test verileri oluşturur.
Performans Analizi: Algoritmaların farklı veri boyutlarında performansını ölçer.
Kullanıcı Arayüzü: Sonuçları görsel olarak sunar.
Beklenen Çıktılar
Müşteri temsilcileri ve müşteriler arasındaki optimal eşleşmeler.
Seçilen pazarlama kampanyaları ve bunların beklenen getirileri.
Algoritmaların zaman ve alan karmaşıklığı analizi.
Performans grafikleri ve ölçümleri.
