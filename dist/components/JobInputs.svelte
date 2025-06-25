<script>
  import TextInput from "./TextInput.svelte";
  export let jobLevel;
  export let setJobLevel;
  export let jobPercent;
  export let setJobPercent;
  export let minLevel = 1;
  export let maxLevel = 50;
  export let t = (key) => key;
</script>

<div class="flex flex-col md:flex-row gap-4">
  <TextInput
    id="jobLevelInput"
    label={t("initialJobLevel")}
    type="number"
    bind:value={jobLevel}
    min={minLevel}
    max={maxLevel}
    step={1}
    onInput={(e) => {
      let val = e.target.value;
      // Allow empty string for editing
      if (val === "") {
        setJobLevel("");
        return;
      }
      val = +val;
      if (val < minLevel) val = minLevel;
      if (val > maxLevel) val = maxLevel;
      setJobLevel(val);
    }}
  />
  <TextInput
    id="jobPercentInput"
    label={t("initialJobProgress")}
    type="number"
    bind:value={jobPercent}
    min={0}
    max={100}
    step={1}
    onInput={(e) => {
      let val = e.target.value;
      if (val === "") {
        setJobPercent("");
        return;
      }
      setJobPercent(val);
    }}
  />
</div>
