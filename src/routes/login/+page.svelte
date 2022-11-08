<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Sign in • Conduit</title>
</svelte:head>

<div class="auth-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<h1 class="text-xs-center">Sign In</h1>
				<p class="text-xs-center">
					<a href="/register">Need an account?</a>
				</p>

				<!-- <ListErrors {errors} /> -->

				<form method="post">
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
					<button class="btn btn-lg btn-primary pull-xs-right" type="submit"> Sign in </button>
				</form>
			</div>
		</div>
	</div>
</div>
