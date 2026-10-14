import { ref } from "vue";
import { supabase } from "../services/supabase";

export function useLaporan() {
  const totalEsKrimBulanIni = ref(0);
  const totalPengeluaranBulanIni = ref(0);
  const loading = ref(false);

  const HARGA_ES_KRIM = 2000; // Rp2.000 per unit

  const fetchLaporanBulanIni = async () => {
    loading.value = true;
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];

    // Hitung total klaim es krim di bulan berjalan
    const { count, error } = await supabase.from("log_klaim").select("*", { count: "exact", head: true }).gte("tanggal", firstDay);

    if (!error) {
      totalEsKrimBulanIni.value = count || 0;
      totalPengeluaranBulanIni.value = (count || 0) * HARGA_ES_KRIM;
    }
    loading.value = false;
  };

  const catatKlaimEsKrim = async (anakId) => {
    await supabase.from("log_klaim").insert([{ anak_id: anakId }]);
    await fetchLaporanBulanIni();
  };

  // Fungsi Export Data ke file CSV / Excel
  const exportToCSV = (dataAnak) => {
    if (!dataAnak || dataAnak.length === 0) return alert("Tidak ada data untuk di-export.");

    const headers = ["Nama Anak", "Kategori", "Jumlah Stempel", "Total Es Krim Diklaim", "Tanggal Terdaftar"];
    const rows = dataAnak.map((a) => [`"${a.nama}"`, `"${a.tingkat}"`, a.jumlah_stempel, a.total_es_krim_diklaim || 0, `"${new Date(a.created_at).toLocaleDateString("id-ID")}"`]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_Jagoan_Pintar_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    totalEsKrimBulanIni,
    totalPengeluaranBulanIni,
    loading,
    fetchLaporanBulanIni,
    catatKlaimEsKrim,
    exportToCSV,
  };
}
