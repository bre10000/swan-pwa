<script>
    import { _, locale, locales } from "svelte-i18n";
    import { localeS } from "../../store/locale";

    let value = "en";
    function handleLocaleChange(event) {
        console.log(event.target.value);
        event.preventDefault();
        $locale = event.target.value;
        localeS.setLocale(event.target.value);
    }

    localeS.subscribe((v) => {
        $locale = v;
        value = v;
    });
</script>

<div class="navbar-item has-dropdown is-hoverable">
    <a href={"#"} class="navbar-link is-flex is-align-items-center">
        <img
            src="./images/icons/language.png"
            alt="language icon"
            class="mr-3"
            width="20"
        />
        <span class="pt-1" class:amharic={$localeS == "am"}>{$_("languages." + $localeS.replace("-", "_"))}</span>
    </a>

    <div
        class="navbar-dropdown"
        style="border-top: none; margin-left: -8px; padding-top: 10px;"
    >
        <a
            href={"#"}
            class="navbar-item is-flex is-align-items-center amharic"
            on:click|preventDefault={() => {
                $locale = "am";
                localeS.setLocale("am");
            }}
        >
            <img
                src="./images/icons/ethiopia.png"
                alt="ethiopian flag"
                width="25"
                class="mr-3"
            /> አማርኛ
        </a>
        <a
            href={"#"}
            class="navbar-item is-flex is-align-items-center"
            on:click|preventDefault={() => {
                $locale = "en";
                localeS.setLocale("en");
            }}
        >
            <img
                src="./images/icons/england.png"
                alt="ethiopian flag"
                width="25"
                class="mr-3"
            /> English
        </a>
    </div>
</div>

<!-- <div class="locale-selector navbar-item">
    <div class="select">
        <select {value} on:change={handleLocaleChange}>
            {#each $locales as item}
                <option value={item}>
                    <span class:amharic={item == "am"}>
                        {$_("languages." + item.replace("-", "_"))}
                    </span>
                </option>
            {/each}
        </select>
    </div>
</div> -->

<style>
    /* Styles omitted for brevity. For full code see Github repo. */
</style>
