<script>
  // Svelte
  import { onMount } from "svelte";

  // Utils
  const { DateTime } = require("luxon");

  // Stores
  import { dbTasks, dbLogs } from "../../stores/db";

  // Components
  import Holder from "../../components/Holder.svelte";
  import LastDays from "../../components/LastDays.svelte";
  import Help from "../../components/Help.svelte";
  import List from "../../components/List.svelte";
  import Info from "./info.svelte";

  // Model
  let tasks = false;
  let currentIndex = -1;
  let logs = [];

  $: currentTask = tasks[currentIndex];

  // Lifecycle
  onMount(() => {
    $dbTasks
      .find()
      .then(res => {
        tasks = res;
      })
      .catch(err => console.log(err));
    $dbLogs
      .find()
      .then(res => {
        logs = res.sort(
          (a, b) => DateTime.fromISO(b.date) - DateTime.fromISO(a.date)
        );
      })
      .catch(err => console.log(err));
  });

  // Events
  function onWindowKeydown(e) {
    switch (e.key) {
      case `ArrowDown`:
        e.preventDefault();
        if (currentIndex < tasks.length - 1) {
          currentIndex = currentIndex + 1;
        }
        break;
      case `ArrowUp`:
        e.preventDefault();
        if (currentIndex > 0) {
          currentIndex = currentIndex - 1;
        }
        break;
      case `Backspace`:
        e.preventDefault();
        $dbTasks.remove({ _id: currentTask._id }).then(() =>
          $dbTasks
            .find()
            .then(res => {
              tasks = res;
            })
            .catch(err => console.log(err))
        );
    }
  }
</script>

<style>
  main {
    display: flex;
    align-items: flex-start;
  }
</style>

<svelte:window on:keydown={onWindowKeydown} />

<main>
  {#if tasks.length}
    <List {currentIndex} data={tasks} />
  {:else if tasks}
    <Holder />
  {/if}
  {#if currentTask}
    <Info {currentTask} {logs} />
  {:else}
    <Help />
  {/if}
</main>
<LastDays {logs} prop="task" active={currentTask ? currentTask.name : false} />
