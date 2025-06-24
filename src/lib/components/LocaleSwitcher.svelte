<script>
  import { onMount, onDestroy } from "svelte";
  export let lang;
  export let setLang;
  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "pt", label: "Português", flag: "🇧🇷" },
    { code: "es", label: "Español", flag: "🇪🇸" },
  ];
  let open = false;
  let closeTimeout;
  let mounted = false;
  let hasWindow = false;

  function selectLang(code) {
    setLang(code);
    open = false;
  }
  function handleMouseLeave() {
    closeTimeout = setTimeout(() => (open = false), 500);
  }
  function handleMouseEnter() {
    clearTimeout(closeTimeout);
  }
  function handleClickOutside(event) {
    if (!event.target.closest(".locale-switcher-root")) {
      open = false;
    }
  }

  onMount(() => {
    mounted = true;
    hasWindow = typeof window !== "undefined";
  });
  onDestroy(() => {
    if (hasWindow) window.removeEventListener("mousedown", handleClickOutside);
  });

  $: if (mounted && hasWindow) {
    if (open) {
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      window.removeEventListener("mousedown", handleClickOutside);
    }
  }
</script>

<div class="locale-switcher-root">
  <button
    class="absolute top-2 right-2 flex items-center gap-2 px-3 py-1 rounded-full text-indigo-800 font-semibold text-sm bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
    on:click={() => (open = !open)}
    aria-haspopup="listbox"
    aria-expanded={open}
    type="button"
  >
    <span class="inline-block h-4"
      >{languages.find((l) => l.code === lang)?.flag}</span
    >
    <span>{languages.find((l) => l.code === lang)?.label}</span>
    <svg
      class="w-3 h-3 ml-1 text-indigo-400 transform transition-transform duration-200"
      style="transform: rotate({open ? 180 : 0}deg);"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {#if open}
    <ul
      class="absolute right-0 mt-2 min-w-[8rem] max-w-[10rem] bg-white border border-indigo-200 rounded-xl shadow-lg z-20 py-1 animate-fade-in"
      tabindex="-1"
      role="listbox"
      on:mouseleave={handleMouseLeave}
      on:mouseenter={handleMouseEnter}
    >
      {#each languages as l}
        <li>
          <button
            class="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-indigo-100 rounded-lg text-indigo-800 text-sm font-medium transition"
            on:click={() => selectLang(l.code)}
            aria-selected={lang === l.code}
            type="button"
          >
            <span>{l.flag}</span>
            <span>{l.label}</span>
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .animate-fade-in {
    animation: fadeIn 0.15s ease;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .min-w-\[8rem\] {
    min-width: 8rem;
  }
  .max-w-\[10rem\] {
    max-width: 10rem;
  }
</style>
