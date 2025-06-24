<script>
  export let id = "";
  export let label = "";
  export let type = "number";
  export let value;
  export let min;
  export let max;
  export let step = 1;
  export let onInput;
</script>

<div class="flex flex-col gap-2 w-full">
  <label class="font-semibold" for={id}>{label}</label>
  <input
    {id}
    {type}
    bind:value
    {min}
    {max}
    {step}
    class="input input-bordered border-indigo-200 focus:ring-2 focus:ring-indigo-400 border-0 border-b"
    on:input={onInput}
  />
</div>
