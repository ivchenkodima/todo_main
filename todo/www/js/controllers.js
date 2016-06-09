angular.module('controllers',[])

.controller('ProjectCtrl',function($scope, $timeout, $ionicModal, Projects, $ionicSideMenuDelegate){
  
  $scope.projects = Projects.all();
  $scope.$watch('projects', function(newValue, oldValue) {
    Projects.save($scope.projects);    
  }, true);
  $scope.$watch('activeProject', function (newValue, oldValue) {
    if (newValue == oldValue) return false;
    Projects.setActiveProject($scope.activeProject);
  }, true);

  $timeout(function() {
    var a = Projects.getLastActiveProject();
    $scope.activeProject = a || newProject();
  },0);

  $scope.createProject = function(project){
    var newProject = Projects.newProject(project.name);
    $scope.projects.push(newProject);
    $scope.selectProject(newProject);
    $scope.closeNewProject();
    project.name = null;
  };
  $scope.isActive = function (project) {
    return $scope.activeProject === project;
  };
  $scope.selectProject  = function(project){
    $scope.activeProject = project;
    $ionicSideMenuDelegate.toggleLeft(true);
  };
  $scope.deleteSelectedProject = function(selectedProject){
    if (typeof selectedProject === 'undefined') return;
    var index = $scope.projects.indexOf(selectedProject);
    for (var i = 0; i <= $scope.projects[index].tasks.length; i++){
      $scope.projects[index].tasks.splice(i);
    };
    $scope.projects.splice(index, 1);
  };
  $scope.toggleProjects = function(){
    $ionicSideMenuDelegate.toggleLeft();
  };
  $ionicModal.fromTemplateUrl('templates/create-new-project-modal.html',{
    scope: $scope,
    animation: 'slide-in-up',
  }).then(function(modal){
    $scope.projectModal = modal;
  });
  $scope.newProject = function(){
    $scope.projectModal.show();
  };
  $scope.closeNewProject = function(){
    $scope.projectModal.hide();
  };

})

.controller('TaskCtrl', function($scope){

  $scope.createTask = function(task){
    if(!$scope.activeProject || !task){
      return;
    }
    $scope.activeProject.tasks.push({
      title: task.title,
      date: new Date(task.date) || new Date(),
      checked: false,
      comment: task.comment
    });
    $scope.closeNewTask();
    task.title = null;
    task.date= new Date();
    task.comment = null;
    task.checked = false;
  };
  $scope.deleteActiveTask = function(task){
    if(typeof task ==="undefined") return;
    console.log("delete an: " +  task.title);
    var index  = $scope.activeProject.tasks.indexOf(task);
    $scope.activeProject.tasks.splice(index, 1);
  };
  $scope.activeTask = function(task){
    return $scope.activeProject.activeTask = task;
  };
  // create and load models
  $ionicModal.fromTemplateUrl('templates/new-task-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.taskModal = modal;
  });
  $ionicModal.fromTemplateUrl('templates/edit-task-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.editTaskModal = modal;
  });
  $scope.editTask = function(task){
    
    var indexOf = $scope.activeProject.activeTask;

    $scope.activeProject.activeTask.title = task.title || $scope.activeProject.activeTask.title;
    $scope.activeProject.activeTask.date = task.date || new Date();
    $scope.activeProject.activeTask.comment = task.comment || $scope.activeProject.activeTask.comment;
    $scope.activeProject.activeTask.checked = false;
     
    $scope.closeEditTask();

    task.title = null;
    task.date= new Date();
    task.comment = null;
    task.checked = false;
    
    $scope.activeProject.activeTask = null;
  };

  $scope.newTask = function(){
    $scope.taskModal.show();
  };
  $scope.closeNewTask = function(){
    $scope.taskModal.hide();
  };
  $scope.editActiveTask =  function(task){
    $scope.editTaskModal.show();  
  };
  $scope.closeEditTask = function(){
    $scope.editTaskModal.hide();
  };
  $scope.toggleCheckTask = function(task){
    task.checked = !task.checked;
  };

})

