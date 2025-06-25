<script>
  import TextInput from "$lib/components/TextInput.svelte";
  export let level;
  export let setLevel;
  export let levelPercent;
  export let setLevelPercent;
  export let minLevel = 1;
  export let maxLevel = 99;
  export let t = (key) => key;
</script>

<div class="flex flex-col md:flex-row gap-4">
  <TextInput
    id="baseLevelInput"
    label={t("initialBaseLevel")}
    type="number"
    bind:value={level}
    min={minLevel}
    max={maxLevel}
    step={1}
    onInput={(e) => {
      let val = e.target.value;
      // Allow empty string for editing
      if (val === "") {
        setLevel("");
        return;
      }
      val = +val;
      if (val < minLevel) val = minLevel;
      if (val > maxLevel) val = maxLevel;
      setLevel(val);
    }}
  />
  <TextInput
    id="baseLevelPercentInput"
    label={t("initialBaseProgress")}
    type="number"
    bind:value={levelPercent}
    min={0}
    max={100}
    step={1}
    onInput={(e) => {
      let val = e.target.value;
      if (val === "") {
        setLevelPercent("");
        return;
      }
      setLevelPercent(val);
    }}
  />
</div>
