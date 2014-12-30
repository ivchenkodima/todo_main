angular.module("todo", ['ionic', 'controllers'])


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
    // console.log("getLast active project", 'all',this.all(), 'lastactive index',this.getLastActiveIndex());
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
