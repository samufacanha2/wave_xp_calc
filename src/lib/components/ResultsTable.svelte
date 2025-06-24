<script>
  export let result;
  export let t = (key) => key;
</script>

{#if result}
  <div class="mt-10 bg-indigo-50/80 rounded-xl p-6 shadow-inner">
    <h2 class="text-2xl font-bold mb-6 text-indigo-800 text-center">
      {t("results")}
    </h2>
    <div class="flex flex-col md:flex-row gap-6 mb-6">
      <!-- Base Card -->
      <div
        class="flex-1 bg-white rounded-lg p-6 shadow text-center border-2 border-indigo-300"
      >
        <div class="text-lg font-semibold text-indigo-700 mb-2">
          {t("base")} Progress
        </div>
        <div class="text-3xl text-indigo-800 mb-1">
          {t("level")}
          {result.finalLevel}
        </div>
        {#if result.finalLevel === result.maxLevel}
          <br class="mb-2" />
        {:else}
          <div class="text-base text-gray-600 mb-2">
            {result.finalLevelPercent}%
          </div>
        {/if}
        <div class="text-sm text-gray-500">{t("totalXP")} {t("base")}</div>
        <div class="text-xl font-bold text-indigo-600">
          {result.totalBaseXP}
        </div>
      </div>
      <!-- Job Card -->
      <div
        class="flex-1 bg-white rounded-lg p-6 shadow text-center border-2 border-indigo-300"
      >
        <div class="text-lg font-semibold text-indigo-700 mb-2">
          {t("job")} Progress
        </div>
        <div class="text-3xl text-indigo-800 mb-1">
          {t("level")}
          {result.finalJobLevel}
        </div>
        {#if result.finalJobLevel === result.maxJobLevel}
          <br class="mb-2" />
        {:else}
          <div class="text-base text-gray-600 mb-2">
            {result.finalJobLevelPercent}%
          </div>
        {/if}
        <div class="text-sm text-gray-500">{t("totalXP")} {t("job")}</div>
        <div class="text-xl font-bold text-indigo-600">{result.totalJobXP}</div>
      </div>
    </div>
    <details class="sticky top-0 mt-4">
      <summary class="cursor-pointer font-semibold text-indigo-700">
        {t("breakdown")}
      </summary>
      <div class="mt-2">
        <table class="table-auto w-full text-xs md:text-sm rounded-lg">
          <thead>
            <tr class="sticky -top-0.5 z-10 bg-indigo-100">
              <th class="border border-gray-200 px-2 py-1">{t("monster")}</th>
              <th class="border border-gray-200 px-2 py-1">{t("level")}</th>
              <th class="border border-gray-200 px-2 py-1">Level Diff (XP%)</th>
              <th class="border border-gray-200 px-2 py-1">Base XP (wave)</th>
              <th class="border border-gray-200 px-2 py-1">Job XP (wave)</th>
              <th class="border border-gray-200 px-2 py-1">{t("afterLevel")}</th
              >
              <th class="border border-gray-200 px-2 py-1"
                >{t("afterJobLevel")}</th
              >
            </tr>
          </thead>
          <tbody>
            {#each result.log as row, i}
              <tr
                class={row.percent >= 80
                  ? i % 2 === 0
                    ? "bg-green-100"
                    : "bg-green-200"
                  : i % 2 === 0
                    ? "bg-red-100"
                    : "bg-red-200"}
              >
                <td class="border border-gray-200 px-2 py-1">{row.monster}</td>
                <td class="border border-gray-200 px-2 py-1"
                  >{row.monsterLevel}</td
                >
                <td class="border border-gray-200 px-2 py-1"
                  >{row.diff} ({row.percent}%)</td
                >
                <td class="border border-gray-200 px-2 py-1">{row.base}</td>
                <td class="border border-gray-200 px-2 py-1">{row.job}</td>
                <td class="border border-gray-200 px-2 py-1">
                  {row.afterLevel}
                  <span class="text-xs text-gray-500">
                    ({row.afterLevelPercent}%)
                  </span>
                </td>
                <td class="border border-gray-200 px-2 py-1">
                  {row.afterJobLevel}
                  {#if row.afterJobLevel !== result.maxJobLevel}
                    <span class="text-xs text-gray-500">
                      ({row.afterJobLevelPercent}%)
                    </span>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </details>
  </div>
{/if}
