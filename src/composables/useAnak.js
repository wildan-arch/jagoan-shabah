import { ref, computed } from "vue";
import { supabase } from "../services/supabase";

export function useAnak() {
  const daftarAnak = ref([]);
  const loading = ref(false);
  const searchQuery = ref("");

  const fetchAnak = async () => {
    loading.value = true;
    const { data, error } = await supabase.from("anak").select("*").order("created_at", { ascending: false });

    if (!error) daftarAnak.value = data || [];
    loading.value = false;
  };

  const filteredAnak = computed(() => {
    return daftarAnak.value.filter((a) => a.nama.toLowerCase().includes(searchQuery.value.toLowerCase()));
  });

  const tambahAnak = async (payload) => {
    const { data, error } = await supabase.from("anak").insert([payload]).select();
    if (!error) await fetchAnak();
    return { data, error };
  };

  const updateStempel = async (anakId, newStempel) => {
    const { error } = await supabase.from("anak").update({ jumlah_stempel: newStempel }).eq("id", anakId);

    if (!error) await fetchAnak();
    return { error };
  };

  const resetKlaimEsKrim = async (anak) => {
    const { error } = await supabase
      .from("anak")
      .update({
        jumlah_stempel: 0,
        total_es_krim_diklaim: (anak.total_es_krim_diklaim || 0) + 1,
      })
      .eq("id", anak.id);

    if (!error) await fetchAnak();
    return { error };
  };

  return {
    daftarAnak,
    filteredAnak,
    searchQuery,
    loading,
    fetchAnak,
    tambahAnak,
    updateStempel,
    resetKlaimEsKrim,
  };
}
