define(['jquery'], function($) {
    var GithubEventHandler = function() {};

    GithubEventHandler.prototype.PushEvent = function(evt) {
        var nb_commit = evt.payload.commits.length,
            repo_url = 'https://github.com/' + evt.repo.name;

        var icon = 'octicon octicon-repo-push bg-green-active';
        var title = 'Push ' + nb_commit + ' commit(s) ';
        title += 'on <a href="' + repo_url + '">' + evt.repo.name + '</a>';

        var description = '<ul>';

        $.each(evt.payload.commits, function(idx, commit) {
            description += '<li><a href="' + repo_url + '/commit/' + commit.sha + '">';
            description += '<span class="label label-success">' + commit.sha.slice(0, 7) + '</span> ';
            description += commit.message + '</a>';
            description += '</li>';
        });

        description += '</ul>';
        
        return {
            icon: icon,
            title: title,
            description: description
        };
    };

    GithubEventHandler.prototype.CreateEvent = function(evt) {
        var icon = 'octicon ',
            title = '',
            repo_url = 'https://github.com/' + evt.repo.name;

        switch(evt.payload.ref_type) {
            case 'tag':
                icon += 'octicon-tag bg-aqua';
                title = 'Create tag <span class="label label-warning">' + evt.payload.ref + '</span> ';
                title += 'on <a href="' + repo_url + '">' + evt.repo.name + '</a>';
                break;

            case 'branch':
                icon += 'octicon-git-branch bg-purple';
                title = 'Create branch <span class="label label-warning">' + evt.payload.ref + '</span> ';
                title += 'on <a href="' + repo_url + '">' + evt.repo.name + '</a>';
                break;

            case 'repository':
                icon = 'octicon-repo bg-red';
                title = 'Create repository <a href="' + repo_url + '">' + evt.repo.name + '</a>';
                break;
        }

        return {
            icon: icon,
            title: title,
            description: evt.payload.description
        };
    };

    GithubEventHandler.prototype.PullRequestEvent = function(evt) {
        var icon = 'octicon octicon-git-pull-request ',
            title = '';

        switch(evt.payload.action) {
            case 'opened':
                icon += 'bg-green';
                title += 'Opened';
                break;

            case 'assigned':
                icon += 'bg-aqua';
                title += 'Assigned to';
                break;

            case 'unassigned':
                icon += 'bg-orange-active';
                title += 'Unassigned from';
                break;

            case 'labeled':
                icon += 'bg-info';
                title += 'Labeled';
                break;

            case 'unlabeled':
                icon += 'bg-info';
                title += 'Unlabeled';
                break;

            case 'edited':
                icon += 'bg-purple';
                title += 'Edited';
                break;

            case 'closed':
                icon += 'bg-red';
                title += 'Closed';

            case 'reopened':
                icon += 'bg-green';
                title += 'Reopened';
                break;

            case 'synchronize':
                icon += 'bg-navy';
                title += 'Synchronized';
                break;
        }
        
        title += ' pull request <a href="' + evt.payload.pull_request.html_url + '">#' + evt.payload.number + '</a>';

        return {
            icon: icon,
            title: title,
            description: evt.payload.pull_request.title
        };
    };

    GithubEventHandler.prototype.ForkEvent = function(evt) {
        var title = 'Forked repository <a href="';

        title += evt.payload.forkee.html_url + '"">';
        title += evt.payload.forkee.full_name;
        title += '</a>';

        return {
            icon: 'octicon octicon-repo-forked bg-purple',
            title: title,
            description: evt.payload.forkee.description
        };
    };

    GithubEventHandler.prototype.IssuesEvent = function(evt) {
        var icon = 'octicon ',
            title = '';

        switch(evt.payload.action) {
            case 'opened':
                icon += 'octicon-issue-opened bg-green';
                title += 'Opened';
                break;

            case 'closed':
                icon += 'octicon-issue-closed bg-red';
                title += 'Closed';
                break;

            case 'reopened':
                icon += 'octicon-issue-reopened bg-purple';
                title += 'Reopened';
                break;

            case 'edited':
                icon += 'octicon-issue-opened bg-orange-active';
                title += 'Edited';
                break

            case 'assigned':
                icon += 'octicon-issue-opened bg-info';
                title += 'Assigned to';
                break

            case 'unassigned':
                icon += 'octicon-issue-opened bg-info';
                title += 'Unassigned from';
                break

            case 'labeled':
                icon += 'octicon-issue-opened bg-info';
                title += 'Labeled';
                break

            case 'unlabeled':
                icon += 'octicon-issue-opened bg-info';
                title += 'Unlabeled';
                break
        }

        title += ' issue <a href="' + evt.payload.issue.html_url + '">';
        title += evt.repo.name + '/' + evt.payload.issue.number;
        title += '</a>';

        var description = evt.payload.issue.title;

        $.each(evt.payload.issue.labels, function(idx, label) {
            css = 'background-color: #' + label.color + '; color: white;';

            description += ' <a href="' + evt.payload.issue.repository.html_url + '">';
            description += '<span class="label" style="' + css + '">';
            description += label.name;
            description += '</span>';
            description += '</a>';
        });

        return {
            icon: icon,
            title: title,
            description: description
        };
    };

    GithubEventHandler.prototype.IssueCommentEvent = function(evt) {
        var icon = 'octicon octicon-comment ',
            title = '';

        switch(evt.payload.action) {
            case 'created':
                icon += 'bg-green';
                title += 'Commented on';
                break;

            case 'edited':
                icon += 'bg-orange';
                title += 'Edited a comment on';
                break;

            case 'closed':
                icon += 'bg-red';
                title += 'Deleted a comment on';
                break;
        }

        title += ' issue <a href="' + evt.payload.comment.html_url + '">';
        title += evt.repo.name + '/' + evt.payload.issue.number;
        title += '</a>';

        return {
            icon: icon,
            title: title,
            description: ''
        };
    };

    return new GithubEventHandler();
});
