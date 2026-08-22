<script>
  import { io } from 'socket.io-client';

  let counter = $state(0);
  let socket;

  $effect(() => {
    socket = io('http://localhost:3001');

    socket.on('counter:update', (val) => {
      counter = val;
    });

    return () => socket.disconnect();
  });
</script>

<svelte:head>
  <title>LeagueFM Test Opdracht</title>
</svelte:head>

<h1 id="counter">{counter}</h1>
<button onclick={() => socket?.emit('counter:decrement')}>-1</button>
<button onclick={() => socket?.emit('counter:increment')}>+1</button>
