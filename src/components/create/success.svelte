<script>
  // Utils
  import typewriter from "../../utils/typewriter";

  // Model
  export let log = {};
  export let type = {};
  export let division = {};
  export let task = {};
  export let term = {};
  export let user = {};
  export let isSuccess;
</script>

<style>
  li {
    display: flex;
    align-items: baseline;
  }

  span {
    width: 25%;
    flex-shrink: 0;
    padding: 0 20px 0 0;
    text-align: right;
    color: var(--f_med);
  }

  p {
    margin: 0;
    padding: 5px 20px;
    border-left: 1px solid var(--f_med);
  }
</style>

{#if isSuccess}
  {#if term._id}
    <li>
      <span>⍜</span>
      <p in:typewriter>{`Term created! ID: ${term._id}`}</p>
    </li>
  {/if}
  {#if type._id}
    <li>
      <span>⍜</span>
      <p in:typewriter>{`Type created! ID: ${type._id}`}</p>
    </li>
  {/if}
  {#if division._id}
    <li>
      <span>⍜</span>
      <p in:typewriter>{`Division created! ID: ${division._id}`}</p>
    </li>
  {/if}
  {#if task._id}
    <li>
      <span>⍜</span>
      <p in:typewriter>{`Task created! ID: ${task._id}`}</p>
    </li>
  {/if}
  {#if log._id}
    <li>
      <span>⍜</span>
      <p in:typewriter>{`Log created! ID: ${log._id}`}</p>
    </li>
  {/if}
  {#if user._id}
    <li>
      <span>⍜</span>
      <p in:typewriter>{`User created! ID: ${user._id}`}</p>
    </li>
  {/if}
{/if}
