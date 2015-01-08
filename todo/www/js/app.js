angular.module("todo", 
  ['ionic', 'controllers'])

.service('Projects', function(){
  
  var data = [];

  this.all = function() {
    return data;
  };
  this.loadFromStorage = function () {
    var projectString = window.localStorage['projects'];   
    data = projectString ? angular.fromJson(projectString) || [] : [];
    return data;
  };
  this.save = function(projects){
    window.localStorage['projects'] = angular.toJson(projects);
    data = projects;
  };
  this.newProject = function(projectTitle){
    return {
      title: projectTitle,
      tasks: []
    };
  };
  this.getLastActiveIndex = function(){
    return parseInt(window.localStorage['lastActiveProject']) || 0;
  };  
  this.getLastActiveProject = function () {
    return this.all()[this.getLastActiveIndex()];
  };
  this.getIndexOfProject = function (project) {
    if (typeof project == 'undefined' || project == null) return -1;
    // console.log("getIndexOf Project", project, data, data.indexOf(project));
    var obj = project;
    obj ? delete obj.$$hashKey : null;

    return data.indexOf(obj);
  };
  this.setActiveProject = function(project) {
    if (typeof project === 'undefined') return;
    window.localStorage['lastActiveProject']  = this.getIndexOfProject(project) || 0; 
  };
  
  this.loadFromStorage();
});


/*
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/', {
    controller: 'ListCtrl',
    resolve: {
    recipes: function(MultiRecipeLoader) {
    return MultiRecipeLoader();
    }
    },
    templateUrl:'/views/list.html'
    }).when('/edit/:recipeId', {
    controller: 'EditCtrl',
    resolve: {
    recipe: function(RecipeLoader) {
    return RecipeLoader();
    }
    },
    templateUrl:'/views/recipeForm.html'
    }).when('/view/:recipeId', {
    controller: 'ViewCtrl',
    resolve: {
    recipe: function(RecipeLoader) {
    return RecipeLoader();
    }
    },
    templateUrl:'/views/viewRecipe.html'
    }).when('/new', {
    controller: 'NewCtrl',
    templateUrl:'/views/recipeForm.html'
    }).otherwise({redirectTo:'/'});
}]);
*/