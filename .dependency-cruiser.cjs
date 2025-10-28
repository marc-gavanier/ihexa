/** @type {import('dependency-cruiser').IConfiguration} */

const FORBIDDEN_GLOBAL = [
  {
    name: 'no-circular',
    severity: 'warn',
    comment:
      'This dependency is part of a circular relationship. You might want to revise ' +
      'your solution (i.e. use dependency inversion, make sure the modules have a single responsibility) ',
    from: {},
    to: {
      circular: true
    }
  },
  {
    name: 'no-orphans',
    comment:
      "This is an orphan module - it's likely not used (anymore?). Either use it or " +
      "remove it. If it's logical this module is an orphan (i.e. it's a config file), " +
      'add an exception for it in your dependency-cruiser configuration. By default ' +
      'this rule does not scrutinize dot-files (e.g. .eslintrc.js), TypeScript declaration ' +
      'files (.d.ts), tsconfig.json and some of the babel and webpack configs.',
    severity: 'warn',
    from: {
      orphan: true,
      pathNot: [
        '(^|/)[.][^/]+[.](?:js|cjs|mjs|ts|cts|mts|json)$', // dot files
        '[.]d[.]ts$', // TypeScript declaration files
        '(^|/)tsconfig[.]json$', // TypeScript config
        '(^|/)(?:babel|webpack)[.]config[.](?:js|cjs|mjs|ts|cts|mts|json)$' // other configs
      ]
    },
    to: {}
  },
  {
    name: 'no-deprecated-core',
    comment:
      'A module depends on a node core module that has been deprecated. Find an alternative - these are ' +
      "bound to exist - node doesn't deprecate lightly.",
    severity: 'warn',
    from: {},
    to: {
      dependencyTypes: ['core'],
      path: [
        '^v8/tools/codemap$',
        '^v8/tools/consarray$',
        '^v8/tools/csvparser$',
        '^v8/tools/logreader$',
        '^v8/tools/profile_view$',
        '^v8/tools/profile$',
        '^v8/tools/SourceMap$',
        '^v8/tools/splaytree$',
        '^v8/tools/tickprocessor-driver$',
        '^v8/tools/tickprocessor$',
        '^node-inspect/lib/_inspect$',
        '^node-inspect/lib/internal/inspect_client$',
        '^node-inspect/lib/internal/inspect_repl$',
        '^async_hooks$',
        '^punycode$',
        '^domain$',
        '^constants$',
        '^sys$',
        '^_linklist$',
        '^_stream_wrap$'
      ]
    }
  },
  {
    name: 'not-to-deprecated',
    comment:
      'This module uses a (version of an) npm module that has been deprecated. Either upgrade to a later ' +
      'version of that module, or find an alternative. Deprecated modules are a security risk.',
    severity: 'warn',
    from: {},
    to: {
      dependencyTypes: ['deprecated']
    }
  },
  {
    name: 'no-non-package-json',
    severity: 'error',
    comment:
      "This module depends on an npm package that isn't in the 'dependencies' section of your package.json. " +
      "That's problematic as the package either (1) won't be available on live (2 - worse) will be " +
      'available on live with an non-guaranteed version. Fix it by adding the package to the dependencies ' +
      'in your package.json.',
    from: {},
    to: {
      dependencyTypes: ['npm-no-pkg', 'npm-unknown']
    }
  },
  {
    name: 'not-to-unresolvable',
    comment:
      "This module depends on a module that cannot be found ('resolved to disk'). If it's an npm " +
      'module: add it to your package.json. In all other cases you likely already know what to do.',
    severity: 'error',
    from: {},
    to: {
      couldNotResolve: true
    }
  },
  {
    name: 'no-duplicate-dep-types',
    comment:
      "Likely this module depends on an external ('npm') package that occurs more than once " +
      'in your package.json i.e. bot as a devDependencies and in dependencies. This will cause ' +
      'maintenance problems later on.',
    severity: 'warn',
    from: {},
    to: {
      moreThanOneDependencyType: true,
      // as it's pretty common to have a type import be a type only import
      // _and_ (e.g.) a devDependency - don't consider type-only dependency
      // types for this rule
      dependencyTypesNot: ['type-only']
    }
  },
  {
    name: 'not-to-spec',
    comment:
      'This module depends on a spec (test) file. The sole responsibility of a spec file is to test code. ' +
      "If there's something in a spec that's of use to other modules, it doesn't have that single " +
      'responsibility anymore. Factor it out into (e.g.) a separate utility/ helper or a mock.',
    severity: 'error',
    from: {},
    to: {
      path: '[.](?:spec|test|e2e|feature|stories)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$'
    }
  },
  {
    name: 'not-to-dev-dep',
    severity: 'error',
    comment:
      "This module depends on an npm package from the 'devDependencies' section of your " +
      'package.json. It looks like something that ships to production, though. To prevent problems ' +
      "with npm packages that aren't there on production declare it (only!) in the 'dependencies'" +
      'section of your package.json. If this module is development only - add it to the ' +
      'from.pathNot re of the not-to-dev-dep rule in the dependency-cruiser configuration',
    from: {
      path: '^(src)',
      pathNot: '[.](?:spec|test|e2e|feature|stories)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$'
    },
    to: {
      dependencyTypes: ['npm-dev'],
      // type only dependencies are not a problem as they don't end up in the
      // production code or are ignored by the runtime.
      dependencyTypesNot: ['type-only'],
      pathNot: ['node_modules/@types/']
    }
  },
  {
    name: 'optional-deps-used',
    severity: 'info',
    comment:
      'This module depends on an npm package that is declared as an optional dependency ' +
      "in your package.json. As this makes sense in limited situations only, it's flagged here. " +
      "If you're using an optional dependency here by design - add an exception to your" +
      'dependency-cruiser configuration.',
    from: {},
    to: {
      dependencyTypes: ['npm-optional']
    }
  },
  {
    name: 'peer-deps-used',
    comment:
      'This module depends on an npm package that is declared as a peer dependency ' +
      'in your package.json. This makes sense if your package is e.g. a plugin, but in ' +
      'other cases - maybe not so much. If the use of a peer dependency is intentional ' +
      'add an exception to your dependency-cruiser configuration.',
    severity: 'warn',
    from: {},
    to: {
      dependencyTypes: ['npm-peer']
    }
  }
];

const FORBIDDEN_APP = [
  {
    name: 'no-interdependencies-in-app',
    comment:
      'Each file inside the `src/app` folder represents a primary entry point, such as a page or an API route. These entry points define the system’s external boundaries and must remain isolated from one another. This isolation prevents hidden coupling between entry points and keeps orchestration minimal and explicit. The only allowed dependencies are `src/features`, which host business capabilities, and `src/libraries` for shared technical utilities. This ensures the application layer remains declarative, composable, and free of cross-entry logic.',
    severity: 'error',
    from: {
      path: ['^src/app']
    },
    to: {
      pathNot: ['node_modules', 'src/libraries', 'src/features', 'src/styles/globals.css']
    }
  }
];

const FORBIDDEN_FEATURES = {
  GLOBAL: [
    {
      name: 'no-app-dependencies-in-features',
      comment:
        'Features represent self-contained, business-oriented capabilities that model a specific aspect of the domain. They encapsulate all domain logic, abilities, and related implementations needed to fulfill their purpose. Features must never depend on application code, the `src/app` folder defines framework-specific entry points, while `src/features` hosts the autonomous business-oriented capabilities. This one-way dependency flow ensures that features remain focused on the specific aspect of the problem they address.',
      severity: 'error',
      from: {
        path: ['^src/features']
      },
      to: {
        path: ['^src/app']
      }
    },
    {
      name: 'no-interdependencies-between-features',
      comment:
        'Features must never depend on other features. Each feature under `src/features` encapsulates its own domain, abilities, and supporting implementations, forming a fully autonomous unit of business capability. This strict isolation prevents coupling, simplifies reasoning about the system, and enables each feature to evolve independently without impacting other features.',
      severity: 'error',
      from: { path: '^src/features/([^/]+)/' },
      to: { path: '^src/features', pathNot: '^src/features/$1' }
    }
  ],
  ABILITIES: [
    {
      name: 'no-interdependencies-between-abilities',
      comment:
        "An ability represents a distinct, self-contained business behavior within a feature. It encapsulates all of the elements required to fulfill a specific part of the feature's responsibility. Abilities must never depend on other abilities within the same feature. This strict isolation ensures that each ability can evolve independently and remains focused on its specific responsibility.",
      severity: 'error',
      from: { path: 'src/features/([^/]+)/abilities/([^/]+)/' },
      to: {
        path: 'src/features/$1/abilities/',
        pathNot: 'src/features/$1/abilities/$2'
      }
    },
    {
      name: 'no-dependencies-in-ability-domain',
      comment:
        "Each ability can define its own local domain to encapsulate business rules and models that are specific to that ability alone. Code under `src/features/<feature>/abilities/<ability>/domain` represents pure domain logic, isolated from frameworks, implementations, or other abilities. It must remain fully self-contained and can only depend on itself or specific allowed libraries such as `effect` and `ddd`. This localized domain design ensures that each ability has the autonomy to express its unique business rules without polluting or depending on the broader feature domain.",
      severity: 'error',
      from: {
        path: ['^src/features/([^/]+)/abilities/([^/]+)/domain'],
        pathNot: '[.](?:spec|test|e2e|feature|stories)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$'
      },
      to: {
        pathNot: ['^node_modules/[^/]+/effect', '^src/libraries/ddd', '^src/features/$1/domain/abilities/$2']
      }
    },
    {
      name: 'no-dependencies-between-ability-operations',
      comment:
        "Commands and queries represent the fundamental operations of an ability. A command performs a specific business action that may change state, while a query retrieves information without side effects. Each command or query within an ability must remain fully isolated. They live under `src/features/<feature>/abilities/<ability>/command` or `query` and represent the smallest self-contained business actions or reads. Commands and queries can only depend on the feature's domain and adapter implementations through dependency injection.",
      severity: 'error',
      from: {
        path: ['^src/features/([^/]+)/abilities/([^/]+)/(?:command|query)/'],
        pathNot: '[.](?:spec|test|e2e|feature|stories)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$'
      },
      to: {
        pathNot: ['^node_modules/[^/]+/effect', '^src/libraries/injection', 'src/features/$1/domain', 'src/features/$1/keys']
      }
    },
    {
      name: 'no-external-dependencies-in-ability-ui',
      comment:
        "UI for an ability represents only the components and logic strictly necessary to render the specific business behavior it supports. Colocalizing the UI under `src/features/<feature>/abilities/<ability>/ui` simplifies comprehension and maintenance. The UI can only depend on its own components, the feature's domain, or shared UI utilities. This isolation ensures that UI logic remains focused on the business ability it is dedicated to.",
      severity: 'error',
      from: {
        path: ['^src/features/([^/]+)/abilities/([^/]+)/ui'],
        pathNot: '[.](?:spec|test|e2e|feature|stories)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$'
      },
      to: {
        pathNot: ['^src/libraries/i18n', '^src/libraries/ui', '^src/features/$1/abilities/$2/ui', '^src/features/$1/domain']
      }
    },
    {
      name: 'no-external-dependencies-in-ability-validations',
      comment:
        "Validations ensure that all inputs—query parameters, form data, or other user-provided values—respect business rules and technical constraints before any command or query is executed. They must remain fully isolated, and code under `src/features/<feature>/abilities/<ability>/validations` can only depend on the feature's domain or the effect library.",
      severity: 'error',
      from: {
        path: ['^src/features/([^/]+)/abilities/([^/]+)/validations'],
        pathNot: 'index[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$'
      },
      to: {
        pathNot: ['^node_modules/[^/]+/effect', '^src/features/$1/domain']
      }
    }
  ],
  DOMAIN: [
    {
      name: 'no-dependencies-in-domain',
      comment:
        'Domain code represents the core business concepts and rules of a feature. It is the pure model of the problem the feature solves, without concern for any framework, ability, or application. Domain code under `src/features/<feature>/domain` must be pure, fully self-contained and can only depend on itself or specific allowed libraries such as `effect` and `ddd`. This isolation preserves autonomy, testability, and reusability of the core business logic.',
      severity: 'error',
      from: {
        path: ['^src/features/([^/]+)/domain'],
        pathNot: '[.](?:spec|test|e2e|feature|stories)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$'
      },
      to: {
        pathNot: ['^node_modules/[^/]+/effect', '^src/libraries/ddd', '^src/libraries/utils/string', '^src/features/$1/domain']
      }
    }
  ],
  IMPLEMENTATIONS: [
    {
      name: 'no-other-dependencies-than-domain-in-feature-implementations',
      comment:
        "Feature implementations provide concrete realizations of secondary adapters or technical details necessary for the feature to function. They can only depend on the feature's domain or specific allowed libraries. No other dependencies are allowed. This ensures that implementations remain focused on bridging the domain with technical concerns.",
      severity: 'error',
      from: {
        path: '^src/features/([^/]+)/implementations',
        pathNot: 'index[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$'
      },
      to: {
        pathNot: ['^src/features/$1/domain', '^node_modules/[^/]+/effect']
      }
    }
  ],
  KEYS: [
    {
      name: 'no-other-dependencies-than-domain-in-feature-keys',
      comment:
        "Keys act as isolated pivots between a feature's domain contracts and their concrete implementations. They serve as a dedicated layer for dependency inversion, allowing the domain to remain unaware of specific adapters or injection tools. Code under `src/features/<feature>/keys` can only depend on the feature's domain or specific allowed libraries such as `piqure`.",
      severity: 'error',
      from: {
        path: '^src/features/([^/]+)/keys',
        pathNot: 'index[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$'
      },
      to: {
        pathNot: ['^src/features/$1/domain', '^node_modules/[^/]+/piqure']
      }
    }
  ],
  TRANSFER: [
    {
      name: 'no-other-dependencies-than-domain-in-feature-transfers',
      comment:
        "Transfers define explicit transformations between the domain model and external representations, adapting data formats to enable communication between systems. Code under `src/features/<feature>/transfers` can only depend on the feature's domain and must remain fully isolated from other abilities, features, or application layers. This ensures that transfers are focused solely on translating the domain model.",
      severity: 'error',
      from: {
        path: '^src/features/([^/]+)/transfers',
        pathNot: 'index[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$'
      },
      to: {
        pathNot: ['^src/features/$1/domain']
      }
    }
  ]
};

const FORBIDDEN_LIBRARIES = [
  {
    name: 'no-app-or-features-dependencies-in-libraries',
    comment: 'Libraries should be self-contained and not depend on other modules, except for specific allowed node modules.',
    severity: 'error',
    from: {
      path: ['^src/libraries']
    },
    to: {
      pathNot: ['^src/libraries', '^node_modules', 'assert']
    }
  },
  {
    name: 'no-interdependencies-between-libraries',
    comment: 'No interdependencies allowed between libraries.',
    severity: 'error',
    from: { path: 'src/libraries/([^/]+)/' },
    to: { path: 'src/libraries', pathNot: ['src/libraries/$1', 'src/libraries/utils'] }
  }
];

module.exports = {
  forbidden: [
    ...FORBIDDEN_GLOBAL,
    ...FORBIDDEN_APP,
    ...FORBIDDEN_FEATURES.GLOBAL,
    ...FORBIDDEN_FEATURES.ABILITIES,
    ...FORBIDDEN_FEATURES.DOMAIN,
    ...FORBIDDEN_FEATURES.IMPLEMENTATIONS,
    ...FORBIDDEN_FEATURES.KEYS,
    ...FORBIDDEN_FEATURES.TRANSFER,
    ...FORBIDDEN_LIBRARIES
  ],
  required: [
    {
      name: 'must-initialize-i18n-in-pages',
      severity: 'error',
      module: { path: '^src/app/.*/page.tsx$' },
      to: { path: '/libraries/i18n' }
    }
  ],
  options: {
    /* Which modules not to follow further when encountered */
    doNotFollow: {
      /* path: an array of regular expressions in strings to match against */
      path: ['node_modules']
    },

    /* Which modules to exclude */
    // exclude : {
    //   /* path: an array of regular expressions in strings to match against */
    //   path: '',
    // },

    /* Which modules to exclusively include (array of regular expressions in strings)
       dependency-cruiser will skip everything not matching this pattern
    */
    // includeOnly : [''],

    /* List of module systems to cruise.
       When left out dependency-cruiser will fall back to the list of _all_
       module systems it knows of. It's the default because it's the safe option
       It might come at a performance penalty, though.
       moduleSystems: ['amd', 'cjs', 'es6', 'tsd']

       As in practice only commonjs ('cjs') and ecmascript modules ('es6')
       are widely used, you can limit the moduleSystems to those.
     */

    // moduleSystems: ['cjs', 'es6'],

    /*
      false: don't look at JSDoc imports (the default)
      true: dependency-cruiser will detect dependencies in JSDoc-style
      import statements. Implies "parser": "tsc", so the dependency-cruiser
      will use the typescript parser for JavaScript files.

      For this to work the typescript compiler will need to be installed in the
      same spot as you're running dependency-cruiser from.
     */
    // detectJSDocImports: true,

    /* prefix for links in html and svg output (e.g. 'https://github.com/you/yourrepo/blob/main/'
       to open it on your online repo or `vscode://file/${process.cwd()}/` to
       open it in visual studio code),
     */
    // prefix: `vscode://file/${process.cwd()}/`,

    /* false (the default): ignore dependencies that only exist before typescript-to-javascript compilation
       true: also detect dependencies that only exist before typescript-to-javascript compilation
       "specify": for each dependency identify whether it only exists before compilation or also after
     */
    tsPreCompilationDeps: true,

    /* list of extensions to scan that aren't javascript or compile-to-javascript.
       Empty by default. Only put extensions in here that you want to take into
       account that are _not_ parsable.
    */
    // extraExtensionsToScan: [".json", ".jpg", ".png", ".svg", ".webp"],

    /* if true combines the package.jsons found from the module up to the base
       folder the cruise is initiated from. Useful for how (some) mono-repos
       manage dependencies & dependency definitions.
     */
    // combinedDependencies: false,

    /* if true leave symlinks untouched, otherwise use the realpath */
    // preserveSymlinks: false,

    /* TypeScript project file ('tsconfig.json') to use for
       (1) compilation and
       (2) resolution (e.g. with the paths property)

       The (optional) fileName attribute specifies which file to take (relative to
       dependency-cruiser's current working directory). When not provided
       defaults to './tsconfig.json'.
     */
    tsConfig: {
      fileName: 'tsconfig.json'
    },

    /* Webpack configuration to use to get resolve options from.

       The (optional) fileName attribute specifies which file to take (relative
       to dependency-cruiser's current working directory. When not provided defaults
       to './webpack.conf.js'.

       The (optional) `env` and `arguments` attributes contain the parameters
       to be passed if your webpack config is a function and takes them (see
        webpack documentation for details)
     */
    // webpackConfig: {
    //  fileName: 'webpack.config.js',
    //  env: {},
    //  arguments: {}
    // },

    /* Babel config ('.babelrc', '.babelrc.json', '.babelrc.json5', ...) to use
      for compilation
     */
    // babelConfig: {
    //   fileName: '.babelrc',
    // },

    /* List of strings you have in use in addition to cjs/ es6 requires
       & imports to declare module dependencies. Use this e.g. if you've
       re-declared require, use a require-wrapper or use window.require as
       a hack.
    */
    // exoticRequireStrings: [],

    /* options to pass on to enhanced-resolve, the package dependency-cruiser
       uses to resolve module references to disk. The values below should be
       suitable for most situations

       If you use webpack: you can also set these in webpack.conf.js. The set
       there will override the ones specified here.
     */
    enhancedResolveOptions: {
      /* What to consider as an 'exports' field in package.jsons */
      exportsFields: ['exports'],
      /* List of conditions to check for in the exports field.
         Only works when the 'exportsFields' array is non-empty.
      */
      conditionNames: ['import', 'require', 'node', 'default', 'types'],
      /* The extensions, by default are the same as the ones dependency-cruiser
         can access (run `npx depcruise --info` to see which ones that are in
         _your_ environment). If that list is larger than you need you can pass
         the extensions you actually use (e.g. [".js", ".jsx"]). This can speed
         up module resolution, which is the most expensive step.
       */
      // extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
      /* What to consider a 'main' field in package.json */
      mainFields: ['module', 'main', 'types', 'typings']
      /* A list of alias fields in package.jsons

         See [this specification](https://github.com/defunctzombie/package-browser-field-spec) and
         the webpack [resolve.alias](https://webpack.js.org/configuration/resolve/#resolvealiasfields)
         documentation.

         Defaults to an empty array (= don't use alias fields).
       */
      // aliasFields: ["browser"],
    },

    /* skipAnalysisNotInRules will make dependency-cruiser execute
       analysis strictly necessary for checking the rule set only.

       See https://github.com/sverweij/dependency-cruiser/blob/main/doc/options-reference.md#skipanalysisnotinrules
       for details
     */
    skipAnalysisNotInRules: true,

    reporterOptions: {
      dot: {
        /* pattern of modules that can be consolidated in the detailed
           graphical dependency graph. The default pattern in this configuration
           collapses everything in node_modules to one folder deep so you see
           the external modules, but their innards.
         */
        collapsePattern: 'node_modules/(?:@[^/]+/[^/]+|[^/]+)'

        /* Options to tweak the appearance of your graph.See
           https://github.com/sverweij/dependency-cruiser/blob/main/doc/options-reference.md#reporteroptions
           for details and some examples. If you don't specify a theme
           dependency-cruiser falls back to a built-in one.
        */
        // theme: {
        //   graph: {
        //     /* splines: "ortho" gives straight lines, but is slow on big graphs
        //        splines: "true" gives bezier curves (fast, not as nice as ortho)
        //    */
        //     splines: "true"
        //   },
        // }
      },
      archi: {
        /* pattern of modules that can be consolidated in the high level
           graphical dependency graph. If you use the high level graphical
           dependency graph reporter (`archi`) you probably want to tweak
           this collapsePattern to your situation.
        */
        collapsePattern: '^(?:packages|src|lib(s?)|app(s?)|bin|test(s?)|spec(s?))/[^/]+|node_modules/(?:@[^/]+/[^/]+|[^/]+)'

        /* Options to tweak the appearance of your graph. If you don't specify a
           theme for 'archi' dependency-cruiser will use the one specified in the
           dot section above and otherwise use the default one.
         */
        // theme: { },
      },
      text: {
        highlightFocused: true
      }
    }
  }
};
// generated: dependency-cruiser@17.1.0 on 2025-10-23T22:57:17.403Z
