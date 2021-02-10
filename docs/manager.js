define(['managerAPI'], function(Manager){

    var API = new Manager();

    API.addSequence([
        {
            type:'message', 
            piTemplate: true,
            template:'Click space for examples of a self-esteem questionnaire and a Stroop task', keys: ' '
        }, 
		{
            type:'message',
            piTemplate: true,
            template:'Click space to finish the study', keys: ' '
        }
    ]);

    return API.script;
});
