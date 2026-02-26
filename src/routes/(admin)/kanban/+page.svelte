<script lang="ts">
	type Task = {
		id: number;
		title: string;
		status: string;
		user: string;
		count: number;
		date?: string;
		range?: string;
	};

	type Column = {
		id: string;
		title: string;
		color: string;
		tasks: Task[];
	};

	const board: Column[] = [
		{
			id: 'todo',
			title: 'To-do',
			color: 'bg-red-100',
			tasks: [
				{ id: 1, title: 'Social media', status: 'To-do', user: 'Sophie Worso', count: 2 },
				{ id: 2, title: 'Review survey results', status: 'To-do', user: 'Sophie Worso', count: 1 },
				{ id: 3, title: 'Research video marketing', status: 'To-do', user: 'Sophie Worso', count: 3 }
			]
		},
		{
			id: 'wip',
			title: 'WIP',
			color: 'bg-yellow-100',
			tasks: [
				{ id: 4, title: 'Blog post live', status: 'WIP', user: 'Sophie Worso', date: 'Jun 21, 2019', count: 2 },
				{
					id: 5,
					title: 'Email campaign',
					status: 'WIP',
					user: 'Sophie Worso',
					range: 'Jun 21, 2019 → Jun 21, 2019',
					count: 1
				}
			]
		},
		{
			id: 'complete',
			title: 'Complete',
			color: 'bg-green-100',
			tasks: [
				{ id: 6, title: 'Morning emails and to-do list', status: 'Complete', user: 'Sophie Worso', date: 'Jun 21, 2019', count: 1 },
				{ id: 7, title: 'Blog post', status: 'Complete', user: 'Sophie Worso', date: 'Jun 20, 2019', count: 5 },
				{ id: 8, title: 'Reconcile accounts', status: 'Complete', user: 'Sophie Worso', date: 'Jun 19, 2019', count: 4 },
				{ id: 9, title: 'Website AB test', status: 'Complete', user: 'Sophie Worso', date: 'Jun 18, 2019', count: 3 }
			]
		},
		{
			id: 'empty',
			title: '.',
			color: 'bg-gray-200',
			tasks: []
		}
	];
</script>

<div class="h-screen p-2 bg-gray-100">
	<div class="grid lg:grid-cols-7 md:grid-cols-4 sm:grid-cols-2 gap-5">
		{#each board as column}
			<div class="bg-white rounded px-2 py-2">
				<!-- Header -->
				<div class="flex justify-between items-center mb-2 mx-1">
					<div class="flex items-center">
						<h2 class="{column.color} text-sm w-max px-1 rounded mr-2 text-gray-700">
							{column.title}
						</h2>
						<p class="text-gray-400 text-sm">{column.tasks.length}</p>
					</div>
					<div class="flex items-center text-gray-300">
						<p class="mr-2 text-2xl">---</p>
						<p class="text-2xl">+</p>
					</div>
				</div>

				<!-- Cards -->
				<div class="grid gap-2">
					{#each column.tasks as task (task.id)}
						<div class="p-2 rounded shadow-sm border-gray-100 border-2">
							<h3 class="text-sm mb-3 text-gray-700">{task.title}</h3>

							<p class="{column.color} text-xs w-max p-1 rounded mr-2 text-gray-700">
								{task.status}
							</p>

							<div class="flex items-center mt-2">
								<div class="bg-gray-300 rounded-full w-4 h-4 mr-3"></div>
								<p class="text-xs text-gray-500">{task.user}</p>
							</div>

							{#if task.range}
								<p class="text-xs text-gray-500 mt-2">{task.range}</p>
							{:else if task.date}
								<p class="text-xs text-gray-500 mt-2">{task.date}</p>
							{/if}

							<p class="text-xs text-gray-500 mt-2">{task.count}</p>
						</div>
					{/each}
				</div>

				<!-- Footer -->
				<div class="flex items-center text-gray-300 mt-2 px-1">
					<p class="rounded mr-2 text-2xl">+</p>
					<p class="pt-1 rounded text-sm">New</p>
				</div>
			</div>
		{/each}
	</div>
</div>
