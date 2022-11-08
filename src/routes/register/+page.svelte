<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance, applyAction } from '$app/forms';
	import ListErrors from '$lib/ListErrors.svelte';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Sign up • Conduit</title>
</svelte:head>

<div class="auth-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<h1 class="text-xs-center">Sign up</h1>
				<p class="text-xs-center">
					<a href="/login">Have an account?</a>
				</p>

				<ListErrors errors={form?.errors} />

				<form
					method="post"
					use:enhance={({ form }) => {
						return async ({ result, update }) => {
							if (result.type === 'invalid') {
								await applyAction(result);
								// form.reset();
							}
							update();
						};
					}}
				>
					<fieldset class="form-group">
						<!-- {#if form?.errors && form?.errors.username}
							<p class="error">{form?.errors.username}</p>
						{/if} -->
						<input
							name="username"
							class="form-control form-control-lg"
							type="text"
							required
							placeholder="Your Name"
							value={form?.username ?? ''}
						/>
					</fieldset>
					<fieldset class="form-group">
						<input
							name="email"
							class="form-control form-control-lg"
							type="email"
							required
							placeholder="Email"
							value={form?.email ?? ''}
						/>
					</fieldset>
					<fieldset class="form-group">
						<input
							name="password"
							class="form-control form-control-lg"
							type="password"
							required
							placeholder="Password"
							value={form?.password ?? ''}
						/>
					</fieldset>
					<button class="btn btn-lg btn-primary pull-xs-right"> Sign up </button>
				</form>
			</div>
		</div>
	</div>
</div>
