# Usage

```
const recipe = new Recipe({
    meta: {},
    fermentables: [
        new FermentableAddition({
            ratio: .75,
            fermentable: new Fermentable({})
        }),

        new FermentableAddition({
            ratio: .25,
            fermentable: new Fermentable({})
        })
    ],
    hops: [
        new HopAddition({
            ratio: 1,
            hop: new Hop({})
        })
    ],
    yeasts: [
        new YeastAddition({
            yeast: new Yeast({})
        })
    ]
})
```



