import { ref } from "vue";
import { supabase } from "../services/supabase";

export function useSoal() {
  const daftarSoal = ref([]);
  const loading = ref(false);

  const fetchSoal = async () => {
    loading.value = true;
    const { data, error } = await supabase.from("soal").select("*").eq("aktif", true).order("created_at", { ascending: false });

    if (!error) daftarSoal.value = data || [];
    loading.value = false;
  };

  // FUNGSI BARU: Mengambil 1 soal acak sesuai tingkat/kategori
  const dapatkanSoalAcak = (tingkat) => {
    const soalSesuaiTingkat = daftarSoal.value.filter((s) => s.tingkat === tingkat);

    if (soalSesuaiTingkat.length === 0) return null;

    // Kocok/Acak indeks array
    const randomIndex = Math.floor(Math.random() * soalSesuaiTingkat.length);
    return soalSesuaiTingkat[randomIndex];
  };

  const tambahSoal = async (payload) => {
    const { error } = await supabase.from("soal").insert([payload]);
    if (!error) await fetchSoal();
    return { error };
  };

  return {
    daftarSoal,
    loading,
    fetchSoal,
    dapatkanSoalAcak,
    tambahSoal,
  };
}
