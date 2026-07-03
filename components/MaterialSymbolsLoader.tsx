import Script from "next/script";

const MATERIAL_SYMBOLS_HREF =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap";

export default function MaterialSymbolsLoader() {
  return (
    <>
      <noscript>
        <link href={MATERIAL_SYMBOLS_HREF} rel="stylesheet" />
      </noscript>
      <Script id="material-symbols-loader" strategy="lazyOnload">
        {`(function () {
  if (document.querySelector('link[data-material-symbols]')) return;
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = ${JSON.stringify(MATERIAL_SYMBOLS_HREF)};
  link.setAttribute('data-material-symbols', 'true');
  document.head.appendChild(link);
})();`}
      </Script>
    </>
  );
}
