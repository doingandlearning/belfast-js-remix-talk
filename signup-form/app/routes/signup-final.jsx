import { useEffect, useRef } from "react";

import {
	Form,
	Link,
	useActionData,
	useTransition,
} from "@remix-run/react";

export const action = async ({ request }) => {
	await new Promise((res) => setTimeout(res, 1000));
	const formData = await request.formData();
	const email = formData.get("email");

	const API_KEY = process.env.CONVERTKIT_API_KEY;
	const FORM_ID = process.env.CONVERTKIT_FORM_ID;
	console.log(API_KEY, FORM_ID, process.env)
	const API = "https://api.convertkit.com/v3";

	const res = await fetch(`${API}/forms/${FORM_ID}/subscribe`, {
		method: "post",
		body: JSON.stringify({ email, api_key: API_KEY }),
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
	});

	return res.json();
};

export default function Newsletter() {
	const actionData = useActionData();
	const transition = useTransition();
	const state = transition.submission
		? "submitting"
		: actionData?.subscription
			? "success"
			: actionData?.error
				? "error"
				: "idle";

	const inputRef = useRef(null);
	const successRef = useRef(null);
	const mounted = useRef(false);

	useEffect(() => {
		if (state === "error") {
			inputRef.current?.focus();
		}

		if (state === "idle" && mounted.current) {
			inputRef.current?.select();
		}

		if (state === "success") {
			successRef.current?.focus();
		}

		mounted.current = true;
	}, [state]);

	return (
		<main>
			<Form replace method="post" aria-hidden={state === "success"}>
				<h2>Subscribe!</h2>
				<p>Don't miss any of the action!</p>
				<fieldset>
					<input
						aria-label="Email address"
						aria-describedby="error-message"
						ref={inputRef}
						type="email"
						name="email"
						placeholder="you@example.com"
					/>
					<button type="submit">
						{state === "submitting" ? "Subscribing..." : "Subscribe"}
					</button>
				</fieldset>

				<p id="error-message">
					{state === "error" ? actionData.message : <>&nbsp;</>}
				</p>
			</Form>

			<div aria-hidden={state !== "success"}>
				<h2 ref={successRef} tabIndex={-1}>
					You're subscribed!
				</h2>
				<p>Please check your email to confirm your subscription.</p>
				<Link to=".">Start over</Link>
			</div>
		</main>
	);
}