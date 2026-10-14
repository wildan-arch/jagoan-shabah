import { ref } from "vue";
import { supabase } from "../services/supabase";

export function useKuota() {
  const totalKuotaHariIni = ref(0);
  const loading = ref(false);

  const getTanggalLokal = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchKuotaHariIni = async () => {
    loading.value = true;
    const today = getTanggalLokal();

    const { count, error } = await supabase.from("log_harian").select("*", { count: "exact", head: true }).gte("created_at", `${today}T00:00:00`).lte("created_at", `${today}T23:59:59`);

    if (!error) totalKuotaHariIni.value = count || 0;
    loading.value = false;
  };

  // FUNGSI BARU: Cek apakah anak sudah dapat stempel hari ini
  const sudahStempelHariIni = async (anakId) => {
    const today = getTanggalLokal();
    const { data, error } = await supabase.from("log_harian").select("id").eq("anak_id", anakId).gte("created_at", `${today}T00:00:00`).lte("created_at", `${today}T23:59:59`);

    if (!error && data && data.length > 0) {
      return true; // Sudah stempel hari ini
    }
    return false; // Belum stempel
  };

  const catatLogStempel = async (anakId) => {
    const today = getTanggalLokal();
    const { error } = await supabase.from("log_harian").insert([{ anak_id: anakId, tanggal: today }]);

    if (!error) await fetchKuotaHariIni();
  };

  const resetKuotaHariIni = async () => {
    const today = getTanggalLokal();
    const { error } = await supabase.from("log_harian").delete().gte("created_at", `${today}T00:00:00`);

    if (!error) {
      totalKuotaHariIni.value = 0;
      await fetchKuotaHariIni();
      alert("Kuota hari ini berhasil di-reset!");
    }
  };

  return {
    totalKuotaHariIni,
    loading,
    fetchKuotaHariIni,
    sudahStempelHariIni,
    catatLogStempel,
    resetKuotaHariIni,
  };
}
