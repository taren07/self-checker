import { component$ } from "@builder.io/qwik";
import {
	QwikCityProvider,
	RouterOutlet,
	ServiceWorkerRegister,
} from "@builder.io/qwik-city";

import "./global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
		<QwikCityProvider>
			<head>
				<meta
					charset="utf-8"
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<link rel="manifest" href="/manifest.json" />
				<ServiceWorkerRegister />
			</head>
			<body lang="en">
				<RouterOutlet />
			</body>
		</QwikCityProvider>
	);
});
