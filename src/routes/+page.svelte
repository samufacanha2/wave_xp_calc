<script>
  import BaseInputs from "$lib/components/BaseInputs.svelte";
  import JobInputs from "$lib/components/JobInputs.svelte";
  import ResultsTable from "$lib/components/ResultsTable.svelte";
  import TextInput from "$lib/components/TextInput.svelte";
  import LocaleSwitcher from "$lib/components/LocaleSwitcher.svelte";
  import monsters from "$lib/tables/monsters.json";
  import xpTables from "$lib/tables/xp_tables.json";
  import { calculateXP } from "$lib/xpUtils.js";
  import { tableCategories } from "$lib/tableCategories.js";
  import { translations } from "$lib/locales.js";

  let expRate = 100;
  let level = 1;
  let levelPercent = 0;
  let jobLevel = 1;
  let jobPercent = 0;
  let baseTable = "base_normal";
  let jobTable = "job_first";
  let result = null;

  let lang = "en";
  if (typeof navigator !== "undefined" && navigator.language) {
    const navLang = navigator.language.slice(0, 2);
    if (["en", "pt", "es"].includes(navLang)) {
      lang = navLang;
    }
  }
  $: t = (key) => translations[lang][key] || key;

  let selectedCategoryLabel = tableCategories[0].label;
  let selectedCategory = tableCategories[0];

  $: if (selectedCategoryLabel !== selectedCategory.label) {
    const cat = tableCategories.find((c) => c.label === selectedCategoryLabel);
    if (cat) {
      selectedCategory = cat;
      baseTable = cat.base;
      jobTable = cat.job;
      // Clamp levels if needed
      if (level < (cat.minLevel || 1)) level = cat.minLevel || 1;
      if (level > cat.maxLevel) level = cat.maxLevel;
      if (jobLevel > cat.maxJob) jobLevel = cat.maxJob;
    }
  }

  // State setters for child components
  const setLevel = (v) => (level = +v);
  const setLevelPercent = (v) => (levelPercent = +v);
  const setJobLevel = (v) => (jobLevel = +v);
  const setJobPercent = (v) => (jobPercent = +v);
  let setLang = (v) => (lang = v);

  function handleCalculate() {
    result = calculateXP({
      monsters,
      expRate,
      level,
      levelPercent,
      jobLevel,
      jobPercent,
      baseTable: xpTables[baseTable],
      jobTable: xpTables[jobTable],
      maxJobLevel: selectedCategory.maxJob,
      maxLevel: selectedCategory.maxLevel,
    });
  }

  // Helper to localize category labels
  $: getCategoryLabel = (label) => {
    if (label.startsWith("High")) {
      // e.g. "High Second" => "High Second" (en), "Segunda (Transcendental)" (pt), etc.
      const baseKey = label.replace("High ", "").toLowerCase();
      const base = translations[lang][baseKey];
      if (lang === "en")
        return (
          "High " +
          (base
            ? base.charAt(0).toUpperCase() + base.slice(1)
            : label.replace("High ", ""))
        );
      const baseDisplay = base
        ? base.charAt(0).toUpperCase() + base.slice(1)
        : label.replace("High ", "");
      return baseDisplay + " (" + t("transcendental") + ")";
    }
    // Always use lowercased keys for translation
    const key = label.toLowerCase();
    const translated = translations[lang][key];
    if (!translated) return label;
    return translated.charAt(0).toUpperCase() + translated.slice(1);
  };
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
  <div
    class="max-w-2xl mx-auto bg-white/90 rounded-2xl shadow-xl py-8 relative border border-indigo-300"
  >
    <LocaleSwitcher {lang} {setLang} />
    <h1 class="text-2xl mb-6 text-center text-indigo-700">
      {t("wavesInstanceXPCalculator")}
    </h1>
    <form
      on:submit|preventDefault={handleCalculate}
      class="flex flex-col gap-6"
    >
      <div class="flex flex-col md:flex-row gap-4 items-end px-8">
        <div class="flex-1 flex flex-col gap-2 w-full">
          <label class="font-semibold" for="expRateInput">{t("expRate")}</label>
          <TextInput
            id="expRateInput"
            type="number"
            bind:value={expRate}
            min="1"
            max="1000"
            step="1"
            on:input={(e) => (expRate = +e.target.value)}
          />
        </div>
        <div class="flex-1 flex flex-col gap-2 w-full">
          <label class="font-semibold" for="categorySelect">{t("class")}</label>
          <select
            id="categorySelect"
            bind:value={selectedCategoryLabel}
            class="input input-bordered border-b border-indigo-200 focus:ring-2 focus:ring-indigo-400"
          >
            {#each tableCategories as cat}
              <option value={cat.label}>{getCategoryLabel(cat.label)}</option>
            {/each}
          </select>
        </div>
      </div>
      <div class="bg-indigo-50 px-8 py-8">
        <BaseInputs
          bind:level
          {setLevel}
          bind:levelPercent
          {setLevelPercent}
          minLevel={selectedCategory.minLevel || 1}
          maxLevel={selectedCategory.maxLevel}
          {t}
        />
      </div>
      <div class="px-8">
        <JobInputs
          bind:jobLevel
          {setJobLevel}
          bind:jobPercent
          {setJobPercent}
          minLevel={selectedCategory.minJob || 1}
          maxLevel={selectedCategory.maxJob}
          {t}
        />
      </div>

      <div class="flex items-end mt-2 mx-8">
        <button
          type="submit"
          class="btn btn-primary w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow"
        >
          {t("calculate")}
        </button>
      </div>
    </form>
    <ResultsTable {result} {t} />
  </div>
</div>

<!-- Tailwind styles, no <style> block needed -->
