# GUC Thesis Helper

A chrome extension to help GUC students deal with the thesis prioritization system (currently exclusive for **Engineering**).

## Installation

#### Chrome Store:

Extension is now live on :tada: [Chrome webstore](https://chrome.google.com/webstore/detail/guc-thesis-helper/moefbpbkffafidnhfelbkhoondeledam) :tada:

#### Manual Installation:

You can visit the [releases](https://github.com/AbdullahKady/guc-thesis-helper/releases), download the latest `packed extension` (look for the `.crx` file), open it in chrome to install.

## Usage

**Important:** Make sure you're on the `External/Thesis/ChooseThesis.aspx` URL, loading the page while having the window location (the address bar) pointing to other location (_which is the normal behavior if you click on `Choose Thesis` from the admin system_).

To overcome this, simply visit the [URL](http://student.guc.edu.eg/External/Thesis/ChooseThesis.aspx) above, or `CTRL+Click` on the link from the admin system to open in a new tab.

This is done **purposefully**, to minimize the extension's permissions, that way, the extension has no access to the rest of the admin system.

If you already have chosen your topics, don't be afraid to try it out, after using `Clear all`, re-ordering again will be magical compared to the original system! :grin:

## Features:

- _Order on the fly using drag&drop_, to populate the sortable list, just click on the desired thesis topic, it will be added to the sortable list, after you're happy with the batch you have added (and possibly sorted), click on the `Submit batch` button, it will start a series of requests being sent, **DON'T INTERRUPT** it during such phase, as mentioned below.

- _Remove all selected topics_ in case you have a list that you would like to re-arrange, the procedure will follow the same above.

- _Add all remaining_ in case you ordered enough topics, and just want to list the rest in their default order.

## Important Notes:

- **DON'T** stop any operation mid-way (after starting an operation like submitting/clearing), it will mostly result in inconsistency with the system.

- If an operation is interrupted mid-way, it's recommended that you just use the `Clear all` and start over again(since the GUC system allows invalid states, such as duplicated choices).

- If you want to access the original system operations, rather than disabling the extension, you can just access the system from the admin system, having a the default admin system as the URL will not trigger the extension to work.

- The system is super slow, so give it time. One request takes up on average ~10seconds, you will see a progress indicator showing up when an operation is started.

#### DISCLAIMER

I'm not responsible for any mis-use of this extension.
