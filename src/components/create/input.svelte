<script>
  // Svelte
  import { onMount, onDestroy, createEventDispatcher } from "svelte";

  // Stores
  import { isInput } from "../../stores/muthur";

  // Model
  let input;
  export let value;
  export let placeholder = ``;

  // Lifecycle
  onMount(() => {
    input.focus();
    isInput.set(true);
  });

  onDestroy(() => {
    document.body.focus();
    isInput.set(false);
  });

  // Methods
  const inputResize = () => {
    input.style.height = `auto`;
    input.style.height = `${input.scrollHeight +
      (input.offsetHeight - input.clientHeight)}px`;
  };
  const dispatch = createEventDispatcher();

  // Events
  $: if (value && input) inputResize();

  function onKyedown(e) {
    if (e.key === `Enter` && !e.shiftKey) {
      e.preventDefault();
      dispatch(`submit`);
    } else if (e.key === `Tab`) {
      e.preventDefault();
      dispatch(`help`);
    }
  }
</script>

<style>
  textarea {
    width: 100%;
    margin: 0;
    padding: 10px 20px;
    font-family: inherit;
    font-size: inherit;
    line-height: 1.2;
    color: inherit;
    background: none;
    border: none;
    border-left: 1px solid var(--f_med);
    resize: none;
  }
</style>

<svelte:window on:keydown={() => input.focus()} />

<textarea
  rows="1"
  bind:value
  {placeholder}
  on:keydown={onKyedown}
  bind:this={input} />
