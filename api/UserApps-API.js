/**
 * App ist die abstrakte Klasse einer konkreten App, die ein Entwickler schreiben kann.
 * Im eigenen Javascript-Code muss eine Variable mit dem Namen App vorhanden sein, damit eine App lauffähig ist.

 * @class App
 */
function App() {}

/**
 * Dieses Methode wird aufgerufen, sobald ein Nutzer versucht den Channel zu betreten.
 * Die App kann nun entscheiden, ob der Nutzer den Channel betreten darf.
 * 
 * Hinweis: Um ein responsives User Interface für den Nutzer, der den Channel betreten möchte zu garantieren, muss die App innerhalb von einer Sekunde auf diese Anfrage reagieren, damit ihre Antwort in das Ergebnis einfliesst.
 * 
 * Mit bestimmten Smileyfeatures ist es derzeit trotzdem möglich, den Channel zu betreten.
 * Diese Nutzer können nicht ausgesperrt werden:
 * 
 * Channelbesitzer
 * Channelmoderatoren und HZAs
 * Admins (sofern notwendig)
 * Sysadmins
 * User Apps Team (Mitarbeiter von Knuddels)
 * 
 * 
 * Ist der Channel mit einem Passwort geschützt und der Nutzer, der versucht den Channel zu betreten kennt das Passwort,
 * so kann er nicht aus dem Channel ausgeschlossen werden.
 * @param {User} user
 * @return {ChannelJoinPermission} 
 */
App.prototype.mayJoinChannel = function(user) {};

/**
 * Diese Methode wird jedes Mal aufgerufen, sobald ein Nutzer versucht eine öffentliche Nachricht zu senden.
 * Die App kann nun entscheiden, ob die Nachricht veröffentlicht werden darf.
 * 
 * Laufen mehrere Apps im selben Channel, so wird die Nachricht veröffentlicht, sofern alle Apps es erlauben.
 * 
 * Dauert das Fragen aller Apps nach Erlaubnis länger als 10 Sekunden, so wird die Antwort genutzt, die bis dahin
 * gegeben wurde.
 * @param {PublicMessage} publicMessage
 * @return {Boolean} true, wenn die Nachricht angezeigt werden soll, false im anderen Fall.
 */
App.prototype.mayShowPublicMessage = function(publicMessage) {};

/**
 * Diese Methode wird jedes Mal aufgerufen, sobald ein Nutzer versucht eine öffentliche Handlung auszuführen.
 * Die App kann nun entscheiden, ob die Handlung ausgeführt werden darf.
 * 
 * Laufen mehrere Apps im selben Channel, so wird die Handlung ausgeführt, sofern alle Apps es erlauben.
 * 
 * Dauert das Fragen aller Apps nach Erlaubnis länger als 10 Sekunden, so wird die Antwort genutzt, die bis dahin
 * gegeben wurde.
 * @param {PublicActionMessage} publicActionMessage
 * @return {Boolean} true, wenn die Handlung ausgeführt werden soll, false im anderen Fall.
 */
App.prototype.mayShowPublicActionMessage = function(publicActionMessage) {};

/**
 * Diese Methode wird aufgerufen, sobald die App startet.
 * Dies ist der beste Zeipunkt um Werte zu initialisieren und aus der Persistenz zu lesen.
 * @return {void} 
 */
App.prototype.onAppStart = function() {};

/**
 * Diese Methode wird aufgerufen, wenn ein User Knuddel an den BotUser gesendet hat.
 * Es ist die Aufgabe der App in dieser Methode zu entscheiden, ob sie die Knuddel annimmt oder ablehnt.
 * Wird diese Methode von der App nicht implementiert, so werden Knuddel automatisch akzeptiert.
 * Ist diese Methode implementiert und es treten Fehler (Exceptions, Timeout,...) auf oder der Entwickler entscheidet nicht,
 * was mit den Knuddel geschehen soll, so werden diese vom App-System automatisch an den Absender zurück geschickt.
 * 
 * Wichtig: Zum Zeitpunkt des Aufrufs dieser Methode wurden die Knuddel noch nicht an den BotUser übertragen.
 * @param {KnuddelTransfer} knuddelTransfer
 * @return {void} 
 */
App.prototype.onBeforeKnuddelReceived = function(knuddelTransfer) {};

/**
 * Diese Methode wird aufgerufen, sobald ein BotUser Knuddel von einem User erhalten hat.
 * @param {User} sender
 * @param {BotUser} receiver
 * @param {KnuddelAmount} knuddelAmount
 * @param {String} transferReason
 * @return {void} 
 */
App.prototype.onKnuddelReceived = function(sender, receiver, knuddelAmount, transferReason) {};

/**
 * Diese Methode wird aufgerufen, wenn die App sich darauf vorbereiten soll heruntergefahren zu werden.
 * Als Parameter wird die geschätzte Zeit übergeben, die die App noch hat, bis sie heruntergefahren wird
 * und der Aufruf App/onShutdown:event folgt.
 * 
 * App/onPrepareShutdown:event kann dazu benutzt werden das Nutzererlebnis zu verbessern,
 * sofern eine App heruntergefahren werden muss (bsp. für Updates).
 * Eine Spiele-App könnte z.B. entscheiden, dass sie keine weiteren Spiele eröffnet und den Spielern offener Spiele
 * die Information anzeigt, wie lange das Spiel noch läuft, bevor es unentschieden endet.
 * 
 * Achtung: Die Methode kann im Lebenszyklus einer App mehrfach aufgerufen werden.
 * @param {Number} secondsTillShutdown
 * @return {void} 
 */
App.prototype.onPrepareShutdown = function(secondsTillShutdown) {};

/**
 * Diese Methode wird aufgerufen, wenn ein BotUser privat angeschrieben wird.
 * @param {PrivateMessage} privateMessage
 * @return {void} 
 */
App.prototype.onPrivateMessage = function(privateMessage) {};

/**
 * Diese Methode wird aufgerufen, wenn im Channel der App
 * eine öffentliche Nachricht geschrieben wird.
 * Für Nachrichten von BotUsern wird diese Methode nicht aufgerufen.
 * @param {PublicMessage} publicMessage
 * @return {void} 
 */
App.prototype.onPublicMessage = function(publicMessage) {};

/**
 * Diese Methode wird aufgerufen, wenn im Channel der App
 * eine Event-Nachricht veröffentlicht wird.
 * Für Nachrichten von BotUsern wird diese Methode nicht aufgerufen.
 * @param {PublicEventMessage} publicEventMessage
 * @return {void} 
 */
App.prototype.onPublicEventMessage = function(publicEventMessage) {};

/**
 * Diese Methode wird aufgerufen, wenn im Channel der App
 * eine öffentliche Handlung durchgeführt wird.
 * Für Handlungen von BotUsern wird diese Methode nicht aufgerufen.
 * @param {PublicActionMessage} publicActionMessage
 * @return {void} 
 */
App.prototype.onPublicActionMessage = function(publicActionMessage) {};

/**
 * Diese Methode wird aufgerufen, wenn eine App beendet wird.
 * Sobald diese Methode aufgerufen wird, steht nur noch ein begrenzter Teil der API zur Verfügung.
 * Die App sollte den kompletten Zustand in der Persistenz speichern, sodass der Zustand
 * beim nächsten App/onAppStart:event wiederhergestellt werden kann.
 * 
 * Während des Shutdowns können asynchrone each-Methoden, wie UserPersistenceNumbers/each:method
 * und UserAccess/eachAccessibleUser:method nicht zuverlässig genutzt werden.
 * @return {void} 
 */
App.prototype.onShutdown = function() {};

/**
 * Diese Methode wird aufgerufen, wenn ein User im Channel der App
 * über die Systemfunktionen (/dice, /diceo) würfelt.
 * Die App kann auf das Ergebnis zugreifen und die Daten für die Auswertung und Entscheidungen nutzen.
 * @param {DiceEvent} diceEvent
 * @return {void} 
 */
App.prototype.onUserDiced = function(diceEvent) {};

/**
 * Diese Methode wird aufgerufen, wenn ein User den Channel der App betritt.
 * @param {User} user
 * @return {void} 
 */
App.prototype.onUserJoined = function(user) {};

/**
 * Diese Methode wird aufgerufen, wenn ein User den Channel der App verlässt.
 * @param {User} user
 * @return {void} 
 */
App.prototype.onUserLeft = function(user) {};

/**
 * Diese Methode wird aufgerufen, wenn aus einer anderen App ein Event mit sendAppEvent versendet wurde.
 * @param {AppInstance} appInstance
 * @param {String} type
 * @param {Object} data
 * @return {void} 
 */
App.prototype.onAppEventReceived = function(appInstance, type, data) {};

/**
 * Diese Methode wird aufgerufen, wenn aus dem HTML User Interface ein Event mit
 * sendEvent() gesendet wurde.
 * @param {User} user
 * @param {String} type
 * @param {Object} data
 * @param {AppContentSession} appContentSession
 * @return {void} 
 */
App.prototype.onEventReceived = function(user, type, data, appContentSession) {};

/**
 * Diese Methode wird aufgerufen, wenn ein User Knuddel in seinen KnuddelAccount
 * eingezahlt hat.
 * @param {User} sender
 * @param {BotUser} receiver
 * @param {KnuddelAmount} knuddelAmount
 * @param {String} transferReason
 * @param {KnuddelAccount} knuddelAccount
 * @return {void} 
 */
App.prototype.onAccountReceivedKnuddel = function(sender, receiver, knuddelAmount, transferReason, knuddelAccount) {};

/**
 * Diese Methode wird aufgerufen, wenn sich die Anzahl der Knuddel auf einem KnuddelAccount eines User
 * geändert hat.
 * @param {User} user
 * @param {KnuddelAccount} knuddelAccount
 * @param {KnuddelAmount} oldKnuddelAmount
 * @param {KnuddelAmount} newKnuddelAmount
 * @return {void} 
 */
App.prototype.onAccountChangedKnuddelAmount = function(user, knuddelAccount, oldKnuddelAmount, newKnuddelAmount) {};

/**
 * Ermöglicht das Registrieren eigener Chatbefehle.
 * In einem Channel kann nur eine App laufen, die einen bestimmten Chatbefehl nutzt.
 * Versucht eine zweite App einen Chatbefehl zu registrieren, den eine andere
 * App bereits nutzt, so wird ein Fehler geloggt und die App startet nicht bzw. fährt herunter.
 * 
 * Die Struktur eines registrierten Chatbefehls ist:
 * commandName: function (user, params, command) {}
 * 
 * 
 * 
 * commandName ist der Name der Funktion, wie sie aufgerufen wird (beispielsweise /commandname)
 * user ist der Nutzer, der die Funktion aufgerufen hat
 * params sind die Parameter, die der Nutzer hinter dem Befehl eingegeben hat (beispielsweise /commandname params)
 * command ist der Name des Befehl selbst (beispielsweise commandName)
 * 

* @type {Object}
*/
App.chatCommands = 'chatCommands';



/**
 * Eine Instanz einer Toplist repräsentiert eine eigene Topliste für einen bestimmten userPersistenceNumberKey.

 * @class Toplist
 */
function Toplist() {}

/**
 * Liefert den userPersistenceNumberKey mit dem die Topliste erzeugt wurde.
 * @return {String} userPersistenceNumberKey mit dem die Topliste erzeugt wurde
 */
Toplist.prototype.getUserPersistenceNumberKey = function() {};

/**
 * Liefert den Anzeigenamen der Topliste.
 * @return {String} Anzeigename der Topliste
 */
Toplist.prototype.getDisplayName = function() {};

/**
 * Liefert den Befehl, der im Chat eingegeben werden kann, um diese Topliste zu öffnen.
 * Wird ein User oder eine userId übergeben, so öffnet sich die Topliste mit diesem Nutzer im Fokus.
 * @param {User|Number} [user|userId]
 * @return {String} 
 */
Toplist.prototype.getChatCommand = function(userOruserId) {};

/**
 * Liefert den Anzeigenamen für den übergebenen User oder eine userId.
 * @param {User|Number} user|userId
 * @return {String} Anzeigename
 */
Toplist.prototype.getLabel = function(userOruserId) {};

/**
 * Legt einen Change-Listener an, der jedes mal aufgerufen wird, wenn ein User
 * einen neuen Anzeigenamen erhält.
 * @param {Function} listener
 * @return {void} 
 */
Toplist.prototype.addLabelChangeListener = function(listener) {};

/**
 * Löscht einen LabelChangeListener, der mit Toplist/addLabelChangeListener:method erzeugt wurde.
 * @param {Function} listener
 * @return {void} 
 */
Toplist.prototype.removeLabelChangeListener = function(listener) {};

/**
 * Legt einen Change-Listener an, der jedes mal aufgerufen wird, wenn ein sich der Rang User eines Nutzers ändert.
 * @param {Function} listener
 * @return {void} 
 */
Toplist.prototype.addRankChangeListener = function(listener) {};

/**
 * Löscht einen RankChangeListener, der mit Toplist/addRankChangeListener:method erzeugt wurde.
 * @param {Function} listener
 * @return {void} 
 */
Toplist.prototype.removeRankChangeListener = function(listener) {};




/**
 * Ein SingleDiceResult enthält das Ergebnis aller Würfel desselben Typs.
 * Würfelt man beispielsweise mit der Konfiguration "1w2 + 10w5" so gibt es im DiceResult
 * zwei SingleDiceResult-Objekte. Eines für "1w2" und eines für "10w5".

 * @class SingleDiceResult
 */
function SingleDiceResult() {}

/**
 * Liefert den Würfel zurück, durch den dieses SingleDiceResult erzeugt wurde.
 * @return {Dice} 
 */
SingleDiceResult.prototype.getDice = function() {};

/**
 * Liefert die Ziffern, die gewürfelt wurden.
 * @return {Number[]} 
 */
SingleDiceResult.prototype.valuesRolled = function() {};

/**
 * Liefert die Summe der Augenzahlen des SingleDiceResult.
 * @return {Number} 
 */
SingleDiceResult.prototype.sum = function() {};




/**
 * Liefert Informationen über einen ChatServer.
 * 
 * Die Instanz von ChatServerInfo erhält man über den KnuddelsServer
 * mit KnuddelsServer.getChatServerInfo()

 * @class ChatServerInfo
 * @extends ServerInfo
 */
function ChatServerInfo() {}
ChatServerInfo.prototype = new ServerInfo;

/**
 * Liefert die Information, ob dieser Chat-Server ein Test-System ist.
 * @return {Boolean} 
 */
ChatServerInfo.prototype.isTestSystem = function() {};




/**
 * Repräsentiert den visuellen Inhalt einer App, der einem User angezeigt wird.

 * @class AppContentSession
 */
function AppContentSession() {}

/**
 * Sendet Daten an den verbundenen Client.
 * @param {String} type
 * @param {Object} [data]
 * @return {void} 
 */
AppContentSession.prototype.sendEvent = function(type, data) {};

/**
 * Liefert den AppViewMode.
 * @return {AppViewMode} 
 */
AppContentSession.prototype.getAppViewMode = function() {};

/**
 * Entfernt die AppContentSession beim verbundenen User.
 * @return {void} 
 */
AppContentSession.prototype.remove = function() {};

/**
 * Liefert den User.
 * @return {User} user
 */
AppContentSession.prototype.getUser = function() {};

/**
 * Liefert den verbundenen AppContent.
 * @return {AppContent} 
 */
AppContentSession.prototype.getAppContent = function() {};




/**
 * Diese Dokumentation beschreibt, welche Erweiterungen am serverseitigen String-Objekt vorgenommen wurden.

 * @class String
 */
function String() {}

/**
 * Die Methode liefert den String zurück, auf dem sie aufgerufen wurde mit KCode escaped.
 * @return {String} KCode escaped
 */
String.prototype.escapeKCode = function() {};

/**
 * Entfernt jeglichen KCode aus dem String und gibt ihn zurück.
 * @return {String} 
 */
String.prototype.stripKCode = function() {};

/**
 * Diese Methode liefert die Information, ob der String auf dem die Methode aufgerufen wurde
 * mit einem bestimmten Prefix beginnt.
 * @param {String} prefix
 * @return {Boolean} true, wenn der String mit prefix beginnt.
 */
String.prototype.startsWith = function(prefix) {};

/**
 * Diese Methode liefert die Information, ob der String auf dem die Methode aufgerufen wurde
 * mit einem bestimmten Suffix endet.
 * @param {String} suffix
 * @return {Boolean} true, wenn der String mit suffix endet.
 */
String.prototype.endsWith = function(suffix) {};

/**
 * Liefert die Breite des Strings in der Schriftart Arial mit der gegeben Schriftgröße und Information, ob Text fett dargestellt werden soll.
 * @param {Number} fontSize
 * @param {Boolean} isBold
 * @return {Number} 
 */
String.prototype.getPixelWidth = function(fontSize, isBold) {};

/**
 * Liefert einen  String, der in der Schriftart Arial mit der gegeben Schriftgröße und Information, ob Text fett dargestellt werden soll
 * maximal maxPixelWidth breit ist. Wird der Text dafür gekürzt, so wird an das Ende abbreviationMarker angehangen.
 * Falls abbreviationMarker nicht übergeben wurde, so ist es automatisch '...'.
 * @param {Number} fontSize
 * @param {Boolean} isBold
 * @param {Number} maxPixelWidth
 * @param {String} [abbreviationMarker]
 * @return {String} 
 */
String.prototype.limitString = function(fontSize, isBold, maxPixelWidth, abbreviationMarker) {};

/**
 * Liefert die Information, ob ein bestimmter String in diesem String vorhanden ist.
 * @param {String} needle
 * @return {Boolean} 
 */
String.prototype.contains = function(needle) {};

/**
 * Liefert die Levenshtein-Distanz zum übergebenen  String.
 * Levenshtein-Distanz: Minimale Anzahl von Einfüge-, Lösch- und Ersetz-Operationen, um die erste Zeichenkette in die zweite umzuwandeln.
 * @since AppServer 82271
 * @param {String} otherString
 * @return {Number} 
 */
String.prototype.minimalConversionCost = function(otherString) {};

/**
 * Liefert die Information, ob der String nur aus Zeichen besteht, die in einem Nicknamen
 * vorkommen dürfen.
 * @since AppServer 82271
 * @return {Boolean} 
 */
String.prototype.hasOnlyNicknameCharacters = function() {};

/**
 * Liefert die Information, ob der String nur aus Zeichen besteht, die Nummern sind.
 * @since AppServer 82271
 * @return {Boolean} 
 */
String.prototype.hasOnlyDigits = function() {};

/**
 * Liefert die Information, ob der String nur aus Zeichen besteht, die alphanumerisch + Whitespaces sind.
 * @since AppServer 82271
 * @return {Boolean} 
 */
String.prototype.hasOnlyAlphanumericalAndWhitespaceCharacters = function() {};

/**
 * Liefert die Information, ob der String leer oder null ist.
 * @since AppServer 92695
 * @return {Boolean} 
 */
String.prototype.isEmpty = function() {};

/**
 * Liefert den String in CamelCase.
 * @since AppServer 92695
 * @return {String} 
 */
String.prototype.toCamelCase = function() {};

/**
 * Liefert den String mit dem ersten Buchstaben als Großbuchstaben.
 * @since AppServer 92695
 * @return {String} 
 */
String.prototype.capitalize = function() {};

/**
 * Erstellt eine Kopie des  String, in dem alle Vorkommnisse des  String search in replacement
 * ersetzt werden und liefert diesen zurück.
 * @param {String} search
 * @param {String} replacement
 * @return {String} 
 */
String.prototype.replaceAll = function(search, replacement) {};

/**
 * Erstellt eine Kopie des String, in dem alle Vorkommnisse des regulären Ausdrucks regexp in replacement
 * ersetzt werden und liefert diesen zurück.
 * @param {RegExp} regexp
 * @param {String} replacement
 * @return {String} 
 */
String.prototype.replaceAll = function(regexp, replacement) {};

/**
 * Prüft primitiv, ob der String laut Knuddels-Filterregeln ok ist.
 * @since ChatServer 82262, AppServer 82262
 * @return {Boolean} 
 */
String.prototype.isOk = function() {};




/**
 * Gender repräsentiert das Geschlecht eines User.

 * @class Gender
 */
function Gender() {}

/**
 * Das Geschlecht ist männlich.

* @type {Gender}
*/
Gender.Male = 'Male';
/**
 * Das Geschlecht ist weiblich.

* @type {Gender}
*/
Gender.Female = 'Female';
/**
 * Das Geschlecht ist nicht bekannt.

* @type {Gender}
*/
Gender.Unknown = 'Unknown';



/**
 * Repräsentiert den Status eines User.

 * @class UserStatus
 */
function UserStatus() {}

/**
 * Liefert den numerischen Wert das UserStatus.
 * @return {Number} 
 */
UserStatus.prototype.getNumericStatus = function() {};

/**
 * Liefert die Information ob der aktuelle UserStatus mindestens so hoch ist, wie der übergebene UserStatus.
 * @param {UserStatus} otherUserStatus
 * @return {Boolean} 
 */
UserStatus.prototype.isAtLeast = function(otherUserStatus) {};

/**
 * 

* @type {UserStatus}
*/
UserStatus.Newbie = 'Newbie';
/**
 * 

* @type {UserStatus}
*/
UserStatus.Family = 'Family';
/**
 * 

* @type {UserStatus}
*/
UserStatus.Stammi = 'Stammi';
/**
 * 

* @type {UserStatus}
*/
UserStatus.HonoryMember = 'HonoryMember';
/**
 * 

* @type {UserStatus}
*/
UserStatus.Admin = 'Admin';
/**
 * 

* @type {UserStatus}
*/
UserStatus.SystemBot = 'SystemBot';
/**
 * 

* @type {UserStatus}
*/
UserStatus.Sysadmin = 'Sysadmin';



/**
 * Klasse, mit der clientseitige Farbobjekte erstellt werden können.

 * @class Client.Color
 */
Client.Color = function(){}

/**
 * Erzeugt ein Color-Objekt mit RGB-Werten.
 * @static
 * @param {Number} red
 * @param {Number} green
 * @param {Number} blue
 * @return {Color} 
 */
Client.Color.fromRGB = function(red, green, blue) {};

/**
 * Erzeugt ein Color-Objekt aus einem HexString.
 * @static
 * @param {String} colorString
 * @return {Color} 
 */
Client.Color.fromHexString = function(colorString) {};

/**
 * Liefert den Rot-Anteil der Farbe als Zahl zwischen 0 und 255.
 * @return {Number} 
 */
Client.Color.prototype.getRed = function() {};

/**
 * Liefert den Grün-Anteil der Farbe als Zahl zwischen 0 und 255.
 * @return {Number} 
 */
Client.Color.prototype.getGreen = function() {};

/**
 * Liefert den Blau-Anteil der Farbe als Zahl zwischen 0 und 255.
 * @return {Number} 
 */
Client.Color.prototype.getBlue = function() {};

/**
 * Liefert die Farbe als in CSS nutzbaren HexString.
 * @return {String} 
 */
Client.Color.prototype.asHexString = function() {};




/**
 * Klasse, die es ermöglicht ein Event via Client/dispatchEvent:method zu versenden.

 * @class Client.Event
 */
Client.Event = function(){}

/**
 * Erzeugt ein Event.
 * @static
 * @param {String} type
 * @param {Object} data
 * @return {void} 
 */
Client.Event.Event = function(type, data) {};




/**
 * ToplistLabelChangeEvents erhalten EventListener die bei einer
 * Toplist mit der Methode Toplist/addLabelChangeListener:method
 * erzeugt wurden, nachdem sich der Anzeigename für einen User geändert hat.
 * 
 * Das ToplistLabelChangeEvent enthält alle wichtigen Daten, um auf die Änderung zu reagieren
 * und dem User beispielsweise für den Aufstieg zu gratulieren.

 * @class ToplistLabelChangeEvent
 */
function ToplistLabelChangeEvent() {}

/**
 * Liefert die zugehörige Toplist.
 * @return {Toplist} 
 */
ToplistLabelChangeEvent.prototype.getToplist = function() {};

/**
 * Liefert den vorherigen Anzeigenamen. Hatte der User vorher keinen
 * Anzeigenamen, so ist dieser Wert null.
 * @return {String} 
 */
ToplistLabelChangeEvent.prototype.getOldLabel = function() {};

/**
 * Liefert den neuen Anzeigenamen. Hatte der User nun keinen
 * Anzeigenamen mehr, so ist dieser Wert null.
 * @return {String} 
 */
ToplistLabelChangeEvent.prototype.getNewLabel = function() {};

/**
 * Liefert den User für den das Event ausgelöst wurde.
 * @return {User} 
 */
ToplistLabelChangeEvent.prototype.getUser = function() {};

/**
 * Liefert den Wert, der vor der Änderung gespeichert war.
 * @return {Number} 
 */
ToplistLabelChangeEvent.prototype.getOldValue = function() {};

/**
 * Liefert den neuen Wert.
 * @return {Number} 
 */
ToplistLabelChangeEvent.prototype.getNewValue = function() {};




/**
 * Eine Instanz von PrivateMessage repräsentiert eine private Nachricht im Chat.
 * Die App erhält sämtliche private Nachrichten, die an einen ihrer BotUser
 * geschickt werden.
 * 
 * Hinweis: Eine App hat keinen Zugriff auf private Nachrichten,
 * die Nutzer untereinander schreiben, ohne dass ein BotUser als Empfänger involviert ist.

 * @class PrivateMessage
 * @extends Message
 */
function PrivateMessage() {}
PrivateMessage.prototype = new Message;

/**
 * Liefert die Liste der Empfänger der Nachricht.
 * @return {User[]} 
 */
PrivateMessage.prototype.getReceivingUsers = function() {};

/**
 * Sendet eine private Nachricht an alle Beteiligten des Gespräches.
 * @param {String} text
 * @return {void} 
 */
PrivateMessage.prototype.sendReply = function(text) {};




/**
 * ToplistDisplayType repräsentiert den Anzeigetyp eines Toplisteneintrags im Profil vonUsern.

 * @class ToplistDisplayType
 */
function ToplistDisplayType() {}

/**
 * Nur Anzeigename anzeigen.

* @type {ToplistDisplayType}
*/
ToplistDisplayType.Label = 'Label';
/**
 * Gespeicherten Wert anzeigen.

* @type {ToplistDisplayType}
*/
ToplistDisplayType.Value = 'Value';
/**
 * Anzeigename und Rang anzeigen.

* @type {ToplistDisplayType}
*/
ToplistDisplayType.LabelAndRank = 'LabelAndRank';
/**
 * Wert und Rang anzeigen.

* @type {ToplistDisplayType}
*/
ToplistDisplayType.ValueAndRank = 'ValueAndRank';



/**
 * Klasse, die es ermöglicht den Client innerhalb des HTML User Interface zu steuern und Daten an den Server zu senden.

 * @class Client
 */
function Client() {}

/**
 * Schließt das HTML User Interface.
 * @static
 * @return {void} 
 */
Client.close = function() {};

/**
 * Sendet ein Event zum Server, das mit dem AppHook onEventReceived in der App
 * abgefangen werden kann.
 * @static
 * @param {String} type
 * @param {Object} data
 * @return {void} 
 */
Client.sendEvent = function(type, data) {};

/**
 * Sagt dem Chatserver, dass dieser Befehl für den Nutzer, der das HTML User Interface sieht, ausgeführt werden soll.
 * Ist der Befehl auf einer Whitelist vom Server, so wird er sofort ausgeführt. Im anderen Falle sieht der Nutzer einen
 * Link zum Bestätigen, mit dem er die Aktion starten kann.
 * 
 * Derzeit sind diese Befehle auf der Whitelist: w, info, wc, top, h, dice, d, diceo, w2, serverpp, knuddelaccount,
 * /tf-insert, /tf-inserts, /tf-insertb, /tf-insertsb, /tf-override, /tf-overrides, /tf-overrideb, /tf-overridesb, /autotype
 * @static
 * @param {String} command
 * @return {void} 
 */
Client.executeSlashCommand = function(command) {};

/**
 * Bindet eine Javascript-Datei ein und sorgt dafür, dass immer die aktuellste Version vom Server geladen wird.
 * @static
 * @param {String} files...
 * @return {void} 
 */
Client.includeJS = function(files /* ... */) {};

/**
 * Registriert sich für ein bestimmtes Event, das vom Server mittels User/sendEvent:method oder vom Client via Client/dispatchEvent:method verschickt wurde.
 * @static
 * @param {String} type
 * @param {Function} callback
 * @return {void} 
 */
Client.addEventListener = function(type, callback) {};

/**
 * Sendet ein bestimmtes Event, so dass alle mit Client/addEventListener:method registrierten Listener aufgerufen werden.
 * @static
 * @param {Event} event
 * @return {void} 
 */
Client.dispatchEvent = function(event) {};

/**
 * Entfernt alle Event-Listener für einen bestimmten Event-Typ.
 * @static
 * @param {String} type
 * @return {void} 
 */
Client.removeEventListener = function(type) {};

/**
 * Bindet eine CSS-Datei ein und sorgt dafür, dass immer die aktuellste Version vom Server geladen wird.
 * @static
 * @param {String} files...
 * @return {void} 
 */
Client.includeCSS = function(files /* ... */) {};

/**
 * Spielt einen Sound ab. Der angegebene Dateiname kann hierbei entweder absolut oder relativ zur angezeigten HTML-Datei sein.
 * Bisher können nur Dateien mit Wave-Format zuverlässig abgespielt werden.
 * @static
 * @param {String} fileName
 * @return {void} 
 */
Client.playSound = function(fileName) {};

/**
 * Lädt einen Sound herunter, damit die Datei später ohne Wartezeit abgespielt werden kann.
 * (Android only)
 * Der angegebene Dateiname kann hierbei entweder absolut oder relativ zur angezeigten HTML-Datei sein.
 * @static
 * @param {String} fileName
 * @return {void} 
 */
Client.prefetchSound = function(fileName) {};

/**
 * Gibt einen Sound wieder frei, der in nächster Zeit vom Client nicht mehr gebraucht wird.
 * (Android only)
 * Der angegebene Dateiname kann hierbei entweder absolut oder relativ zur angezeigten HTML-Datei sein.
 * @static
 * @param {String} fileName
 * @return {void} 
 */
Client.freeSound = function(fileName) {};

/**
 * Liefert den HostFrame des aktuellen Inhalts.
 * @static
 * @return {Client.HostFrame} 
 */
Client.getHostFrame = function() {};

/**
 * Liefert den Nicknamen des Users, der gerade dieses HTML User Interface angezeigt bekommt.
 * @static
 * @return {String} Nickname des Betrachters
 */
Client.getNick = function() {};

/**
 * Liefert den aktuellen ClientType des Nutzers, der gerade dieses HTML User Interface angezeigt bekommt.
 * @static
 * @return {ClientType} 
 */
Client.getClientType = function() {};

/**
 * Liefert die Id, die beim Laden von Skripten und Stylesheets an die URL angehängt wird, um sicherzustellen, dass eine neue Version
 * der Datei vom Server geholt wird, statt die Datei aus dem Cache zu laden.
 * 
 * Diese Id kann beim Einbinden eigener Ressourcen zum selben Zweck genutzt werden.
 * @static
 * @return {String} 
 */
Client.getCacheInvalidationId = function() {};

/**
 * Beinhaltet die JSON-Daten, die beim Erstellen des HTMLFile übergeben wurden.

* @type {Object}
*/
Client.pageData = 'pageData';



/**
 * Klasse, die es ermöglicht den Inhalte zu steuern, die im Bereich liegen, der das HTML User Interface hostet.

 * @class Client.HostFrame
 */
Client.HostFrame = function(){}

/**
 * Setzt den Titel der Seite im gezoomten Modus (nur Android).
 * @param {String} newTitle
 * @return {void} 
 */
Client.HostFrame.prototype.setTitle = function(newTitle) {};

/**
 * Ändert die sichtbare Hintergrundfarbe des Hostframes animiert. (Android-only)
 * @param {Color} newColor
 * @param {Number} [durationMillis]
 * @return {void} 
 */
Client.HostFrame.prototype.setBackgroundColor = function(newColor, durationMillis) {};

/**
 * Setzt die Icons, die als Fenster-Icon angezeigt werden sollen. (Applet-only, nur mit AppViewMode.Popup)
 * Die Bilder müssen von groß nach klein sortiert sein. Die größeren Bilder werden (je nach System) automatisch dann eingesetzt,
 * wenn größere Bilder benötigt werden (z.B. in der Task-Leiste, oder beim Alt+Tab Fenster-Wechsel).
 * @since Applet: 9.0bwj, AppServer: 84904
 * @param {String} path...
 * @return {void} 
 */
Client.HostFrame.prototype.setIcons = function(path /* ... */) {};

/**
 * Setzt, ob das Fenster resizable ist. (Applet-only, nur mit AppViewMode.Popup)
 * @param {Boolean} resizable
 * @return {void} 
 */
Client.HostFrame.prototype.setResizable = function(resizable) {};

/**
 * Bringt das Fenster der App (App-Popup bzw. Chat-Fenster) in den Vordergrund. (Applet-only)
 * @since Applet: 9.0bwj, AppServer: 84904
 * @return {void} 
 */
Client.HostFrame.prototype.focus = function() {};

/**
 * Ändert die Größe des App-Fensters (AppViewMode.Popup) bzw. App-Overlays (AppViewMode.Overlay).
 * @since Applet: 9.0bwj, AppServer: 84516
 * @param {Number} width
 * @param {Number} height
 * @return {void} 
 */
Client.HostFrame.prototype.setSize = function(width, height) {};




/**
 * Repräsentiert den Status eines KnuddelPot.

 * @class KnuddelPotState
 */
function KnuddelPotState() {}

/**
 * Der KnuddelPot ist geöffnet und kann neue Teilnehmer annehmen.

* @type {KnuddelPotState}
*/
KnuddelPotState.Open = 'Open';
/**
 * Der KnuddelPot ist versiegelt und kann keine neuen Teilnehmer annehmen.

* @type {KnuddelPotState}
*/
KnuddelPotState.Sealed = 'Sealed';
/**
 * Der KnuddelPot ist beendet und die Knuddel bereits ausgezahlt.

* @type {KnuddelPotState}
*/
KnuddelPotState.Closed = 'Closed';



/**
 * Repräsentiert die Root-Instanz einer App, die im Hauptchannel läuft.
 * 
 * Die Instanz für die RootAppInstance erhält man über das AppInstance-Objekt
 * mit appInstance.getRootInstance()

 * @class RootAppInstance
 * @extends AppInstance
 */
function RootAppInstance() {}
RootAppInstance.prototype = new AppInstance;

/**
 * Aktualisiert diese App im Channel (und ggf. vorhandenen Tochterchanneln) auf die neueste Version.
 * @param {String} [message]
 * @param {String} [logMessage]
 * @return {void} 
 */
RootAppInstance.prototype.updateApp = function(message, logMessage) {};

/**
 * Stoppt diese App.
 * @param {String} [message]
 * @param {String} [logMessage]
 * @return {void} 
 */
RootAppInstance.prototype.stopApp = function(message, logMessage) {};




/**
 * Repräsentiert die Instanz einer App.
 * 
 * Die eigene Instanz von AppInstance erhält man über das AppAccess-Objekt
 * mit appAccess.getOwnInstance()

 * @class AppInstance
 */
function AppInstance() {}

/**
 * Liefert die AppInfo.
 * @return {AppInfo} 
 */
AppInstance.prototype.getAppInfo = function() {};

/**
 * Sendet ein App-Event an diese App-Instanz.
 * @param {String} type
 * @param {Object} data
 * @return {void} 
 */
AppInstance.prototype.sendAppEvent = function(type, data) {};

/**
 * Informiert, ob die aktuelle AppInstanz eine Root-Instanz ist.
 * @return {Boolean} 
 */
AppInstance.prototype.isRootInstance = function() {};

/**
 * Liefert die Root-Instanz der aktuellen App-Instanz.
 * @return {RootAppInstance} 
 */
AppInstance.prototype.getRootInstance = function() {};

/**
 * Liefert alle App-Instanzen dieser App in diesem Channel und Subchannels.
 * Mit includeSelf = false kann man die eigene Instanz ausschließen.
 * @param {Boolean} [includeSelf]
 * @return {AppInstance[]} 
 */
AppInstance.prototype.getAllInstances = function(includeSelf) {};

/**
 * Liefert den Startzeitpunkt dieser AppInstance.
 * @return {Date} 
 */
AppInstance.prototype.getStartDate = function() {};

/**
 * Liefert die Namen der ChatCommands, die diese AppInstnce derzeit registriert hat.
 * @return {String[]|null} 
 */
AppInstance.prototype.getRegisteredChatCommandNames = function() {};

/**
 * Liefert den Namen des Channels in dem diese AppInstance läuft.
 * @return {String} 
 */
AppInstance.prototype.getChannelName = function() {};




/**
 * Ermöglicht Zugriff auf textuelle Channelinformationen und persistente Änderungen.

 * @class ChannelInformation
 */
function ChannelInformation() {}

/**
 * Liefert das eingestellte Thema des Channels.
 * @return {String} 
 */
ChannelInformation.prototype.getTopic = function() {};

/**
 * Aktualisiert das Thema das Channels.
 * @param {String} topic
 * @param {Boolean} showMessage
 * @return {void} 
 */
ChannelInformation.prototype.setTopic = function(topic, showMessage) {};




/**
 * Mit einer Instanz von UserAccess kann eine App
 * auf User zugreifen, die bereits einmal im Channel waren,
 * als die App lief. Für alle nicht zugreifbaren User kann man via UserAccess den korrekt geschriebenen Nicknamen erhalten.
 * 
 * Die Instanz für die UserAccess erhält man über das KnuddelsServer-Objekt
 * mit KnuddelsServer.getUserAccess()

 * @class UserAccess
 */
function UserAccess() {}

/**
 * Liefert die userId des Nutzers mit dem übergebenen Nicknamen.
 * @param {String} nick
 * @return {Number} userId des Users mit dem angegebenen Nick
 */
UserAccess.prototype.getUserId = function(nick) {};

/**
 * Informiert darüber, ob ein Nutzer mit dem übergebenen Nicknamen existiert.
 * @param {String} nick
 * @return {Boolean} true, falls ein User mit diesem Nick existiert, false andernfalls
 */
UserAccess.prototype.exists = function(nick) {};

/**
 * Informiert darüber, ob der Nutzer mit der übergebenen userId geladen werden darf. Neben dem AppDeveloper können nur Nutzer geladen werden, die sich einmal im Channel befanden, als die App
 * lief.
 * @param {Number} userId
 * @return {Boolean} true, falls der Nutzer mit UserAccess/getUserById:method geladen werden darf, false andernfalls
 */
UserAccess.prototype.mayAccess = function(userId) {};

/**
 * Liefert den Nutzer mit der übergebenen userId. Neben dem AppDeveloper können nur Nutzer geladen werden, die sich einmal im Channel befanden, als die App lief. Es wird empfohlen vor der
 * Abfrage von getUserById(userId) mit UserAccess/mayAccess:method abzufragen, ob dies funktionieren wird.
 * @param {Number} userId
 * @return {User} User, der die übergebene userId besitzt
 */
UserAccess.prototype.getUserById = function(userId) {};

/**
 * Liefert den Nicknamen des Nutzers mit der übergebenen userId in der korrekten Schreibweise.
 * @param {Number} userId
 * @return {String} Korrekt geschriebener Nickname für den User der übergebenen userId
 */
UserAccess.prototype.getNick = function(userId) {};

/**
 * Loopt über alle zugreifbaren User sortiert nach Registrierzeitpunkt und
 * führt für jeden User das übergebene Callback aus.
 * @param {Function} callback
 * @param {Object} [parameters]
 * @return {void} 
 */
UserAccess.prototype.eachAccessibleUser = function(callback, parameters) {};




/**
 * Ein Channel ist ein Raum in dem die App läuft.
 * 
 * Die Instanz für den Channel erhält man über das KnuddelsServer-Objekt
 * mit KnuddelsServer.getChannel()

 * @class Channel
 */
function Channel() {}

/**
 * Gibt Zugriff auf das ChannelConfiguration-Objekt des Channels.
 * @return {ChannelConfiguration} 
 */
Channel.prototype.getChannelConfiguration = function() {};

/**
 * Gibt Zugriff auf das ChannelRestrictions-Objekt des Channels.
 * @return {ChannelRestrictions} 
 */
Channel.prototype.getChannelRestrictions = function() {};

/**
 * Gibt Zugriff auf das ChannelDesign-Objekt des Channels.
 * @since AppServer 87470, ChatServer 87470
 * @return {ChannelDesign} 
 */
Channel.prototype.getChannelDesign = function() {};

/**
 * Gibt Zugriff auf Nutzer, die gerade im Channel online sind.
 * @param {UserType} [userType...]
 * @return {User[]} 
 */
Channel.prototype.getOnlineUsers = function(userType /* ... */) {};

/**
 * Liefert die Information, ob in diesem Channel Videos gestreamt werden können.
 * @return {Boolean} 
 */
Channel.prototype.isVideoChannel = function() {};

/**
 * Liefert die VideoChannelData des Channels.
 * @return {VideoChannelData} 
 */
Channel.prototype.getVideoChannelData = function() {};

/**
 * Liefert den Namen des Channels.
 * @return {String} 
 */
Channel.prototype.getChannelName = function() {};

/**
 * Liefert den Namen des Root-Channels (nur relevant, falls die App Tochterchannel haben kann).
 * @return {String} 
 */
Channel.prototype.getRootChannelName = function() {};

/**
 * Liefert den ChannelTalkMode, in dem sich der Channel gerade befindet.
 * @return {ChannelTalkMode} 
 */
Channel.prototype.getTalkMode = function() {};

/**
 * Liefert alle User, die bestimmte ChannelTalkPermissions haben.
 * @param {ChannelTalkPermission} channelTalkPermission...
 * @return {User[]} 
 */
Channel.prototype.getAllUsersWithTalkPermission = function(channelTalkPermission /* ... */) {};

/**
 * Liefert die Information, ob der Channel sichtbar (true) oder unsichtbar (false) ist.
 * @since AppServer 82202
 * @return {Boolean} 
 */
Channel.prototype.isVisible = function() {};




/**
 * Klasse, mit der serverseitige Farbobjekte erstellt werden können.

 * @class Color
 */
function Color() {}

/**
 * Erzeugt ein serverseitiges Color-Objekt mit RGB-Werten.
 * Als Alpha-Wert wird automatisch 255 genutzt.
 * @static
 * @param {Number} red
 * @param {Number} green
 * @param {Number} blue
 * @return {Color} 
 */
Color.fromRGB = function(red, green, blue) {};

/**
 * Erzeugt ein serverseitiges Color-Objekt mit RGBA-Werten.
 * @static
 * @param {Number} red
 * @param {Number} green
 * @param {Number} blue
 * @param {Number} alpha
 * @return {Color} 
 */
Color.fromRGBA = function(red, green, blue, alpha) {};

/**
 * Liefert den Alpha-Wert der Farbe als Zahl zwischen 0 und 255.
 * @return {Number} 
 */
Color.prototype.getAlpha = function() {};

/**
 * Liefert den Blau-Anteil der Farbe als Zahl zwischen 0 und 255.
 * @return {Number} 
 */
Color.prototype.getBlue = function() {};

/**
 * Liefert den Grün-Anteil der Farbe als Zahl zwischen 0 und 255.
 * @return {Number} 
 */
Color.prototype.getGreen = function() {};

/**
 * Liefert den Rot-Anteil der Farbe als Zahl zwischen 0 und 255.
 * @return {Number} 
 */
Color.prototype.getRed = function() {};

/**
 * Liefert die Farbe als KCode zurück.
 * @return {String} 
 */
Color.prototype.toKCode = function() {};

/**
 * Liefert die numerische Repräsentation der Farbe zurück.
 * @return {Number} 
 */
Color.prototype.asNumber = function() {};

/**
 * Erzeugt ein serverseitiges Color-Objekt aus der numerischen Repräsentation einer Farbe.
 * @static
 * @param {Number} value
 * @return {Color} 
 */
Color.fromNumber = function(value) {};




/**
 * Mit einer Instanz von AppProfileEntryAccess kann eine App
 * AppProfileEntry-Objekte (Profileinträge) erzeugen und verwalten.
 * 
 * Die Instanz für die AppProfileEntryAccess erhält man über das KnuddelsServer-Objekt
 * mit KnuddelsServer.getAppProfileEntryAccess()
 * 
 * Achtung: Derzeit darf eine App bis zu fünf AppProfileEntries haben.
 * Achtung: Profileinträge werden nur dann angezeigt, wenn der Channel sichtbar ist.

 * @class AppProfileEntryAccess
 */
function AppProfileEntryAccess() {}

/**
 * Liefert die Liste aller AppProfileEntry-Objekte, die diese App erzeugt hat.
 * @return {AppProfileEntry[]} 
 */
AppProfileEntryAccess.prototype.getAllProfileEntries = function() {};

/**
 * Liefert den AppProfileEntry für den übergebenen userPersistenceNumberKey.
 * @param {String} userPersistenceNumberKey
 * @return {AppProfileEntry} 
 */
AppProfileEntryAccess.prototype.getAppProfileEntry = function(userPersistenceNumberKey) {};

/**
 * Erzeugt oder aktualisiert ein AppProfileEntry anhand der übergebenen Toplist
 * und dem ToplistDisplayType und liefert den AppProfileEntry im Anschluss zurück.
 * 
 * Profileinträge, die erzeugt werden, sind nur sichtbar, solange die App läuft und werden im Profil ausgeblendet, sofern die App aus ist.
 * @param {Toplist} toplist
 * @param {ToplistDisplayType} toplistDisplayType
 * @return {AppProfileEntry} 
 */
AppProfileEntryAccess.prototype.createOrUpdateEntry = function(toplist, toplistDisplayType) {};

/**
 * Löscht den übergebenen AppProfileEntry.
 * @param {AppProfileEntry} appProfileEntry
 * @return {void} 
 */
AppProfileEntryAccess.prototype.removeEntry = function(appProfileEntry) {};




/**
 * Eine ChannelConfiguration erlaubt Zugriff auf verschiedene Details
 * der Konfiguration des Channels, in dem die App läuft.
 * 
 * Die Instanz für die ChannelConfiguration erhält man über das Channel-Objekt
 * mit channel.getChannelConfiguration()

 * @class ChannelConfiguration
 */
function ChannelConfiguration() {}

/**
 * Liefert das ChannelRights-Objekt des Channels.
 * @return {ChannelRights} 
 */
ChannelConfiguration.prototype.getChannelRights = function() {};

/**
 * Liefert das ChannelInformation-Objekt des Channels.
 * @return {ChannelInformation} 
 */
ChannelConfiguration.prototype.getChannelInformation = function() {};




/**
 * Eine Instanz von PublicEventMessage repräsentiert ein öffentliches Event im Chat.
 * Die App erhält die öffentlichen Events.

 * @class PublicEventMessage
 * @extends Message
 */
function PublicEventMessage() {}
PublicEventMessage.prototype = new Message;




/**
 * Für jeden User kann eine UserPersistence angefordert werden, um sich
 * für einen bestimmten Nutzer Dinge persistent zu merken.

 * @class UserPersistence
 * @extends Persistence
 */
function UserPersistence() {}
UserPersistence.prototype = new Persistence;

/**
 * Löscht alle Zahlenwerte, die in dieser UserPersistence gespeichert sind.
 * @since AppServer 88569
 * @return {Number} Anzahl der gelöschten Zahlenwerte
 */
UserPersistence.prototype.deleteAllNumbers = function() {};

/**
 * Löscht alle Objekte, die in dieser UserPersistence gespeichert sind.
 * @since AppServer 88569
 * @return {Number} Anzahl der gelöschten Objekte
 */
UserPersistence.prototype.deleteAllObjects = function() {};

/**
 * Löscht alle Zeichenketten, die in dieser UserPersistence gespeichert sind.
 * @since AppServer 88569
 * @return {Number} Anzahl der gelöschten Zeichenketten.
 */
UserPersistence.prototype.deleteAllStrings = function() {};

/**
 * Löscht alle Daten, die in dieser UserPersistence gespeichert sind.
 * @since AppServer 88569
 * @return {Number} 
 */
UserPersistence.prototype.deleteAll = function() {};




/**
 * Mit dieser Klasse ist es möglich nicht User-spezifische Abfragen auf die UserPersistence auszuführen.

 * @class UserPersistenceNumbers
 */
function UserPersistenceNumbers() {}

/**
 * Liefert die Summe aller via UserPersistence gespeicherten Zahlen für den übergebenen key.
 * @static
 * @param {String} key
 * @return {Number} Summe
 */
UserPersistenceNumbers.getSum = function(key) {};

/**
 * Löscht alle gespeicherten Zahlen-Werte für den übergebenen key.
 * @static
 * @param {String} key
 * @return {Number} Anzahl der gelöschten Einträge
 */
UserPersistenceNumbers.deleteAll = function(key) {};

/**
 * Liefert die Anzahl aller unterschiedlichen Nutzer, die Werte für einen bestimmten key gespeichert haben.
 * Hierbei kann optional der Wertebereich über die parameters eingegrenzt werden.
 * @static
 * @param {String} key
 * @param {Object} [parameters]
 * @return {Number} 
 */
UserPersistenceNumbers.getCount = function(key, parameters) {};

/**
 * Ändert einen bestimmten key bei allen UserPersistence.
 * @static
 * @param {String} oldKeyName
 * @param {String} newKeyName
 * @return {Number} Anzahl der aktualisierten Nutzer
 */
UserPersistenceNumbers.updateKey = function(oldKeyName, newKeyName) {};

/**
 * Ändert alle Werte für einen bestimmten key, die vorher einen bestimmten anderen Wert hatten in der UserPersistence.
 * Hinweis: Da diese Methode ein Batch-Update ist werden keine Change-Listener (ToplistRankChangeEvent, ToplistLabelChangeEvent) ausgelöst.
 * @static
 * @param {String} key
 * @param {Number} oldValue
 * @param {Number} newValue
 * @return {Number} Anzahl der Einträge, die geändert wurden
 */
UserPersistenceNumbers.updateValue = function(key, oldValue, newValue) {};

/**
 * Addiert einen Wert für Einträge mit einem bestimmten key in der UserPersistence.
 * Hinweis: Da diese Methode ein Batch-Update ist werden keine Change-Listener (ToplistRankChangeEvent, ToplistLabelChangeEvent) ausgelöst.
 * @static
 * @param {String} key
 * @param {Number} value
 * @param {Object} [parameters]
 * @return {Number} Anzahl der Einträge, die geändert wurden
 */
UserPersistenceNumbers.addNumber = function(key, value, parameters) {};

/**
 * Liefert ein Array mit UserPersistenceNumberEntry-Objekten für einen bestimmten key.
 * Hierdurch kann beispielsweise eine blätterbare Topliste abgebildet werden.
 * @static
 * @param {String} key
 * @param {Object} [parameters]
 * @return {UserPersistenceNumberEntry[]} Gefundene Elemente - falls keine Elemente vorhanden sind ist das Array leer.
 */
UserPersistenceNumbers.getSortedEntries = function(key, parameters) {};

/**
 * Liefert ein Array mit UserPersistenceNumberEntry-Objekten für einen bestimmten key. Hierbei werden die nähesten Elemente gewählt,
 * die am übergebenen User/UserId liegen. 
 * 
 * Beispiel: Der Nutzer ist in der Liste auf Position 20, dann werden die Resultate von 14-24 bei einem Count von 10 ausgegeben.
 * Beispiel: Der Nutzer ist in der Liste auf Position 3, dann werden die Resultate von 1-10 bei einem Count von 10 ausgegeben.
 * @static
 * @param {String} key
 * @param {User|Number} user|userId
 * @param {Object} [parameters]
 * @return {UserPersistenceNumberEntry[]} Gefundene Elemente - falls keine Elemente vorhanden sind ist das Array leer.
 */
UserPersistenceNumbers.getSortedEntriesAdjacent = function(key, userOruserId, parameters) {};

/**
 * Liefert die absolute Position des Nutzers in der Liste. Die Position ist im Gegensatz zum Rang immer eindeutig.
 * 
 * Bei gleichem Wert hat der Nutzer die höhere Position, der zuerst einen Eintrag in der Persistenz hatte.
 * 
 * Mit der Methode UserPersistenceNumbers/getRank:method kann man den Rang des Nutzers herausfinden. Dieser ist identisch, wenn
 * unterschiedliche Nutzer denselben Wert haben.
 * @static
 * @param {String} key
 * @param {User|Number} user|userId
 * @param {Object} [parameters]
 * @return {Number} 
 */
UserPersistenceNumbers.getPosition = function(key, userOruserId, parameters) {};

/**
 * Liefert den Rang des Nutzers. Der Rang ist nicht eindeutig. Bei gleicher Punktzahl haben Nutzer denselben Rang.
 * Mit der Methode UserPersistenceNumbers/getPosition:method kann man die Position eindeutige Position, statt des Ranges herausfinden.
 * @static
 * @param {String} key
 * @param {User|Number} user|userId
 * @param {Object} [parameters]
 * @return {Number} 
 */
UserPersistenceNumbers.getRank = function(key, userOruserId, parameters) {};

/**
 * Ruft eine Funktion für alle Nutzer auf, die einen bestimmten key in der UserPersistence gesetzt haben.
 * Hierbei greifen die übergebenen Filter.
 * @static
 * @param {String} key
 * @param {Function} callback
 * @param {Object} [parameters]
 * @return {void} 
 */
UserPersistenceNumbers.each = function(key, callback, parameters) {};

/**
 * Liefert alle keys, die für User in der Persistence
 * gespeichert wurden.
 * @static
 * @since AppServer 82483
 * @param {String} [filterKey]
 * @return {String[]} Liste mit allen keys
 */
UserPersistenceNumbers.getAllKeys = function(filterKey) {};




/**
 * Die Instanz von AppInfo zur laufenden App erhält man über die AppInstance
 * mit appInstance.getAppInfo()

 * @class AppInfo
 */
function AppInfo() {}

/**
 * Liefert die AppUid.
 * Diese ist für jede Sub-Channel Instanz der App unterschiedlich.
 * Wenn RootAppUid == AppUid dann ist dies die Root-App-Instanz.
 * @return {Number} 
 */
AppInfo.prototype.getAppUid = function() {};

/**
 * Liefert die RootAppUid.
 * Diese ist für jede Sub-Channel Instanz der App gleich.
 * Wenn RootAppUid == AppUid dann ist dies die Root-App-Instanz.
 * 
 * Sie wird für den Link für Auszahlungen aus einem Knuddel-Account benötigt: /knuddelaccount payout:&lt;RootAppUid&gt;:&lt;BETRAG&gt;
 * @return {Number} 
 */
AppInfo.prototype.getRootAppUid = function() {};

/**
 * Liefert den in der Konfiguration eingestellten Namen der App.
 * @return {String} Name der App
 */
AppInfo.prototype.getAppName = function() {};

/**
 * Liefert die Version der App, die in der Konfiguration eingestellt wurde.
 * @return {String} 
 */
AppInfo.prototype.getAppVersion = function() {};

/**
 * Liefert die eindeutige Id der App.
 * Die appId setzt sich zusammen aus
 * 
 * 	id des Entwicklungsservers
 * 	FTP-Nutzername
 * 	Ordnername der App -> appKey
 * 
 * @return {String} appId
 */
AppInfo.prototype.getAppId = function() {};

/**
 * Liefert den eindeutigen Key der App.
 * Der appKey ist der Ordnername, in dem die App liegt.
 * @return {String} appKey
 */
AppInfo.prototype.getAppKey = function() {};

/**
 * Liefert den Entwickler der App, falls die serverId knuddelsDE oder knuddelsDEV ist, ansonsten null.
 * @return {User} 
 */
AppInfo.prototype.getAppDeveloper = function() {};

/**
 * Liefert die Liste der AppManager für diese App. Die Channelbesitzer zählen automatisch auch als AppManager.
 * @return {User[]} 
 */
AppInfo.prototype.getAppManagers = function() {};

/**
 * Aktualisiert diese App auf die neueste Version.
 * @param {String} [message]
 * @param {String} [logMessage]
 * @return {void} 
 */
AppInfo.prototype.updateApp = function(message, logMessage) {};

/**
 * Stoppt diese App.
 * @param {String} [message]
 * @param {String} [logMessage]
 * @return {void} 
 */
AppInfo.prototype.stopApp = function(message, logMessage) {};

/**
 * Liefert den Steuersatz, der bei Auszahlung bereits genutzer Knuddel von einem 
 * KnuddelAccount an einen User
 * anfällt. Die anfallenden Steuern werden bei Auszahlung vom BotUser
 * abgezogen.
 * @return {Number} 
 */
AppInfo.prototype.getTaxRate = function() {};

/**
 * Liefert den KnuddelAmount, der an Steuern anfallen würde,
 * wenn alle User jetzt all ihre Knuddel aus ihrem
 * KnuddelAccount abheben würden.
 * @return {KnuddelAmount} 
 */
AppInfo.prototype.getTotalTaxKnuddelAmount = function() {};

/**
 * Liefert den KnuddelAmount, der jetzt noch vom
 * BotUser an KnuddelAccounts
 * übertragen werden kann, so dass für alle Knuddel noch die Steuern bezahlt werden können.
 * @return {KnuddelAmount} 
 */
AppInfo.prototype.getMaxPayoutKnuddelAmount = function() {};




/**
 * Eine Instanz von Persistence ermöglicht die persistente Speicherung von Zahlen, Zeichenketten und JSON-Objekten.
 * Es gibt die zwei Arten AppPersistence und UserPersistence
 * 
 * Jeder eigene Datentyp hat seinen eigenen Namensraum.
 * So kann derselbe key für eine Zahl, Zeichenkette und auch JSON-Objekt genutzt werden.
 * 
 * Hinweis: Mit der Persistence gespeicherte Informationen überleben
 * sogar die Deinstallation und Neuinstallation der App.

 * @class Persistence
 */
function Persistence() {}

/**
 * Informiert darüber, ob unter dem key ein String abgespeichert ist.
 * @param {String} key
 * @return {Boolean} 
 */
Persistence.prototype.hasString = function(key) {};

/**
 * Setzt die Zeichenkette value für den key.
 * Falls bereits eine Zeichenkette für den key existiert, so wird diese überschrieben.
 * @param {String} key
 * @param {String} value
 * @return {void} 
 */
Persistence.prototype.setString = function(key, value) {};

/**
 * Liefert die Zeichenkette, die für den key gespeichert ist.
 * Falls für key keine Zeichenkette gespeichert ist, so gibt die Methode
 * den defaultValue zurück.
 * @param {String} key
 * @param {String} [defaultValue]
 * @return {String} 
 */
Persistence.prototype.getString = function(key, defaultValue) {};

/**
 * Löscht die Zeichenkette, die unter key gespeichert ist.
 * @param {String} key
 * @return {void} 
 */
Persistence.prototype.deleteString = function(key) {};

/**
 * Informiert darüber, ob unter dem key eine Zahl abgespeichert ist.
 * @param {String} key
 * @return {Boolean} 
 */
Persistence.prototype.hasNumber = function(key) {};

/**
 * Setzt die Zahl value für den key.
 * Falls bereits eine Zahl für den key existiert, so wird diese überschrieben.
 * @param {String} key
 * @param {Number} value
 * @return {void} 
 */
Persistence.prototype.setNumber = function(key, value) {};

/**
 * Addiert den übergebenen value auf die unter dem Key key vorhandenen Wert drauf.
 * Value kann auch negativ sein um eine Subtraktion durchzuführen.
 * Falls keine Zahl für den key existiert, so wird der value für key gespeichert.
 * @param {String} key
 * @param {Number} value
 * @return {Number} Der neue Wert, der für key gespeichert ist.
 */
Persistence.prototype.addNumber = function(key, value) {};

/**
 * Liefert die Zahl, die für den key gespeichert ist.
 * Falls für key keine Zahl gespeichert ist, so gibt die Methode
 * den defaultValue zurück.
 * @param {String} key
 * @param {Number} [defaultValue]
 * @return {Number} 
 */
Persistence.prototype.getNumber = function(key, defaultValue) {};

/**
 * Löscht die Zahl, die unter key gespeichert ist.
 * @param {String} key
 * @return {void} 
 */
Persistence.prototype.deleteNumber = function(key) {};

/**
 * Informiert darüber, ob unter dem key ein Objekt abgespeichert ist.
 * @param {String} key
 * @return {Boolean} 
 */
Persistence.prototype.hasObject = function(key) {};

/**
 * Setzt das Objekt value für den key.
 * Falls bereits ein Objekt für den key existiert, so wird dieses überschrieben.
 * Das als JSON serialisierte Objekt darf maximal 100kb groß sein.
 * @param {String} key
 * @param {Object} object
 * @return {void} 
 */
Persistence.prototype.setObject = function(key, object) {};

/**
 * Liefert das Objekt, das für den key gespeichert ist.
 * Falls für key kein Objekt gespeichert ist, so gibt die Methode
 * den defaultValue zurück.
 * @param {String} key
 * @param {Object} [defaultValue]
 * @return {Object} 
 */
Persistence.prototype.getObject = function(key, defaultValue) {};

/**
 * Löscht das Objekt, das unter key gespeichert ist.
 * @param {String} key
 * @return {void} 
 */
Persistence.prototype.deleteObject = function(key) {};




/**
 * Repräsentiert den visuellen Inhalt einer Applikation, der Usern angezeigt werden soll.

 * @class AppContent
 */
function AppContent() {}

/**
 * Liefert den AppViewMode.
 * @return {AppViewMode} 
 */
AppContent.prototype.getAppViewMode = function() {};

/**
 * Liefert das HTMLFile, das beim Anlegen des AppContents
 * genutzt wurde.
 * @return {HTMLFile} 
 */
AppContent.prototype.getHTMLFile = function() {};

/**
 * Liefert die Breite des AppContent.
 * @return {Number} width
 */
AppContent.prototype.getWidth = function() {};

/**
 * Liefert die Höhe des AppContent.
 * @return {Number} height
 */
AppContent.prototype.getHeight = function() {};

/**
 * Liefert die LoadConfiguration, mit der die Optik beim Laden des HTML User Interface beeinflusst werden kann.
 * @return {LoadConfiguration} 
 */
AppContent.prototype.getLoadConfiguration = function() {};

/**
 * Liefert einen AppContent, der das HTMLFile als Overlay oben rechts im Channel anzeigt.
 * @static
 * @param {HTMLFile} htmlFile
 * @param {Number} width
 * @param {Number} height
 * @return {AppContent} 
 */
AppContent.overlayContent = function(htmlFile, width, height) {};

/**
 * Liefert einen AppContent, der das HTMLFile als Overlay (200x350) oben rechts im Channel anzeigt.
 * @static
 * @param {HTMLFile} htmlFile
 * @return {AppContent} 
 */
AppContent.overlayContent = function(htmlFile) {};

/**
 * Liefert einen AppContent, der das HTMLFile im Applet/HTML-Chat
 * als Popup (300x400) und auf Android als Fullscreen-View anzeigt.
 * @static
 * @param {HTMLFile} htmlFile
 * @return {AppContent} 
 */
AppContent.popupContent = function(htmlFile) {};

/**
 * Liefert einen AppContent, der das HTMLFile im Applet/HTML-Chat
 * als Popup und auf Android als Fullscreen-View anzeigt.
 * @static
 * @param {HTMLFile} htmlFile
 * @param {Number} width
 * @param {Number} height
 * @return {AppContent} 
 */
AppContent.popupContent = function(htmlFile, width, height) {};

/**
 * Sendet Daten an alle Nutzer, die diesen AppContent geöffnet haben.
 * @param {String} type
 * @param {Object} [data]
 * @return {void} 
 */
AppContent.prototype.sendEvent = function(type, data) {};

/**
 * Liefert eine Liste aller User, die diesen AppContent
 * geöffnet haben.
 * @return {User[]} 
 */
AppContent.prototype.getUsers = function() {};

/**
 * Liefert eine Liste aller AppContentSessions, die dieses AppContent,
 * die User gerade geöffnet haben.
 * @return {AppContentSession[]} 
 */
AppContent.prototype.getSessions = function() {};

/**
 * Ersetzt den AppContent, bei allen Usern, die diesen AppContent
 * geöffnet haben durch den neuen AppContent.
 * 
 * Hinweis: Es können nur AppContent mit demselben AppViewMode
 * zum Ersetzen genutzt werden.
 * @param {AppContent} newAppContent
 * @return {void} 
 */
AppContent.prototype.replaceWithAppContent = function(newAppContent) {};

/**
 * Entfernt diesen AppContent, bei allen Usern, die diesen AppContent
 * geöffnet haben.
 * @return {void} 
 */
AppContent.prototype.remove = function() {};

/**
 * Fügt einen Listener hinzu, der aufgerufen wird, wenn jemand den AppContent schließt.
 * @param {Function} callback
 * @return {void} 
 */
AppContent.prototype.addCloseListener = function(callback) {};




/**
 * Mit einer Instanz von ToplistAccess kann eine App
 * Toplist erzeugen und verwalten.
 * 
 * Die Instanz für die ToplistAccess erhält man über das KnuddelsServer-Objekt
 * mit KnuddelsServer.getToplistAccess()

 * @class ToplistAccess
 */
function ToplistAccess() {}

/**
 * Liefert die Liste aller Toplisten, die diese App erzeugt hat.
 * @return {Toplist[]} 
 */
ToplistAccess.prototype.getAllToplists = function() {};

/**
 * Liefert die Toplist mit dem Persistenz-Key zurück.
 * @param {String} userPersistenceNumberKey
 * @return {Toplist} 
 */
ToplistAccess.prototype.getToplist = function(userPersistenceNumberKey) {};

/**
 * Löscht die übergebene Toplist oder die Toplist mit dem Persistenz-Key.
 * @param {Toplist} toplist
 * @return {void} 
 */
ToplistAccess.prototype.removeToplist = function(toplist) {};

/**
 * Erzeugt oder aktualisiert die Toplist für den übergebenen userPersistenceNumberKey.
 * @param {String} userPersistenceNumberKey
 * @param {String} displayName
 * @param {Object} [parameters]
 * @return {Toplist} 
 */
ToplistAccess.prototype.createOrUpdateToplist = function(userPersistenceNumberKey, displayName, parameters) {};




/**
 * KnuddelsServer ist die 'Einstiegsklasse'. Mit den statischen Methoden des KnuddelsServer erhält man Zugriff auf viele
 * Objekte und Klassen, die im Verlauf der App-Entwicklung benötigt werden.

 * @class KnuddelsServer
 */
function KnuddelsServer() {}

/**
 * Liefert den BotUser, der standardmäßig zur App gehört.
 * @static
 * @return {BotUser} 
 */
KnuddelsServer.getDefaultBotUser = function() {};

/**
 * Liefert die AppPersistence, mit der sich Zahlen, Strings und Javascript-Objekte langfristig und über die Session einer App hinaus gespeichert werden können.
 * @static
 * @return {AppPersistence} 
 */
KnuddelsServer.getPersistence = function() {};

/**
 * Liefert den Channel in dem die App läuft.
 * @static
 * @return {Channel} 
 */
KnuddelsServer.getChannel = function() {};

/**
 * 
 * @static
 * @return {User} 
 */
KnuddelsServer.getAppDeveloper = function() {};

/**
 * 
 * @static
 * @return {String} appId
 */
KnuddelsServer.getAppId = function() {};

/**
 * 
 * @static
 * @return {String} Name der App
 */
KnuddelsServer.getAppName = function() {};

/**
 * 
 * @static
 * @return {String} 
 */
KnuddelsServer.getAppVersion = function() {};

/**
 * Liefert das UserAccess-Objekt, über das
 * User zugreifbar werden.
 * @static
 * @return {UserAccess} 
 */
KnuddelsServer.getUserAccess = function() {};

/**
 * Liefert ein ExternalServerAccess-Objekt, mit dem
 * andere Server angesteuert werden können.
 * @return {ExternalServerAccess} 
 */
KnuddelsServer.prototype.getExternalServerAccess = function() {};

/**
 * 
 * @static
 * @param {String} nick
 * @return {Boolean} 
 */
KnuddelsServer.userExists = function(nick) {};

/**
 * 
 * @static
 * @param {String} nick
 * @return {Number} 
 */
KnuddelsServer.getUserId = function(nick) {};

/**
 * 
 * @static
 * @param {Number} userId
 * @return {Boolean} 
 */
KnuddelsServer.canAccessUser = function(userId) {};

/**
 * 
 * @static
 * @param {Number} userId
 * @return {String} 
 */
KnuddelsServer.getNickCorrectCase = function(userId) {};

/**
 * 
 * @static
 * @param {Number} userId
 * @return {User} 
 */
KnuddelsServer.getUser = function(userId) {};

/**
 * Aktualisiert die Liste der genutzten Hooks. Werden zur Laufzeit chatCommands oder App-Hooks (wie mayJoinChannel) dynamisch erzeugt oder gelöscht, so muss danach refreshHooks()
 * aufgerufen werden, damit diese Änderung wirksam wird.
 * @static
 * @return {void} 
 */
KnuddelsServer.refreshHooks = function() {};

/**
 * Liefert den Standard-Logger für diese App. Alles, was geloggt wird, wird vom Nutzer "App-Logs" als private Nachricht zugestellt.
 * @static
 * @return {Logger} 
 */
KnuddelsServer.getDefaultLogger = function() {};

/**
 * Liefert den Pfad eines Bildes zur Integration in der eigenen App.
 * Alle Bilder, die im Ordner /www in der App abgelegt werden können hier referenziert werden.
 * @static
 * @param {String} imageName
 * @return {String} Absoluter Pfad zum Einbinden der Grafik
 */
KnuddelsServer.getFullImagePath = function(imageName) {};

/**
 * Liefert den Pfad eines Systembildes zur Integration in der eigenen App.
 * Alle Bilder, die unter http://apps4.knuddels.biz/kimg/
 * erreichbar sind können hier referenziert werden.
 * @static
 * @param {String} imageName
 * @return {String} Absoluter Pfad zum Einbinden der Grafik
 */
KnuddelsServer.getFullSystemImagePath = function(imageName) {};

/**
 * 
 * @static
 * @return {Boolean} 
 */
KnuddelsServer.isTestSystem = function() {};

/**
 * Liefert die Informationen über den ChatServer auf dem die App läuft.
 * @static
 * @return {ChatServerInfo} 
 */
KnuddelsServer.getChatServerInfo = function() {};

/**
 * Liefert die Informationen über den AppServer auf dem die App läuft.
 * @static
 * @return {AppServerInfo} 
 */
KnuddelsServer.getAppServerInfo = function() {};

/**
 * 
 * @static
 * @return {AppInfo} 
 */
KnuddelsServer.getAppInfo = function() {};

/**
 * Liefert das AppAccess-Object.
 * @static
 * @return {AppAccess} 
 */
KnuddelsServer.getAppAccess = function() {};

/**
 * 
 * @static
 * @return {User[]} 
 */
KnuddelsServer.getAppManagers = function() {};

/**
 * Erzeugt einen KnuddelPot.
 * 
 * Ist ein KnuddelPot 30 Minuten nach dem Erzeugen noch nicht gesealt,
 * so wird vom Server automatisch ein KnuddelPot/refund:method ausgelöst.
 * @static
 * @param {KnuddelAmount} knuddelAmount
 * @param {Object} [params]
 * @return {KnuddelPot} 
 */
KnuddelsServer.createKnuddelPot = function(knuddelAmount, params) {};

/**
 * Liefert den KnuddelPot mit der angegeben id.
 * @static
 * @param {Number} id
 * @return {KnuddelPot|null} 
 */
KnuddelsServer.getKnuddelPot = function(id) {};

/**
 * Liefert alle für die App noch verwaltbaren KnuddelPot-Objekte.
 * @static
 * @return {KnuddelPot[]} 
 */
KnuddelsServer.getAllKnuddelPots = function() {};

/**
 * Liefert das ToplistAccess-Objekt, über das
 * Toplisten erzeugt und verwaltet werden können.
 * @static
 * @return {ToplistAccess} 
 */
KnuddelsServer.getToplistAccess = function() {};

/**
 * Liefert das AppProfileEntryAccess-Objekt, über das
 * App-Profileinträge erzeugt und verwaltet werden können.
 * @static
 * @return {AppProfileEntryAccess} 
 */
KnuddelsServer.getAppProfileEntryAccess = function() {};




/**
 * Eine Instanz eines AppProfileEntry repräsentiert einen von einer App erzeugen Profileintrag in Profilen von Usern.

 * @class AppProfileEntry
 */
function AppProfileEntry() {}

/**
 * Liefert den key für den die Topliste, die den Profileintrag erzeugt angelegt wurde.
 * @return {String} 
 */
AppProfileEntry.prototype.getKey = function() {};

/**
 * Liefert den getDisplayType
 * @return {ToplistDisplayType} 
 */
AppProfileEntry.prototype.getDisplayType = function() {};

/**
 * Liefert das Toplist-Objekt.
 * @return {Toplist} 
 */
AppProfileEntry.prototype.getToplist = function() {};




/**
 * Ein QuestAccess-Objekt ermöglicht den Zugriff auf die Quests, die ein Nutzer des Chats, für die laufende App hat.
 * 
 * Im Blog findest du Informationen darüber, wie man eine Quest für seine App erhält:
 * https://blog.knuddels.de/2015/10/29/how-to-get-a-quest/

 * @class QuestAccess
 */
function QuestAccess() {}

/**
 * Liefert die Quests
 * für diesen Nutzer in dieser App.
 * @since AppServer 82290, ChatServer 82290
 * @return {Quest[]} quests
 */
QuestAccess.prototype.getQuests = function() {};

/**
 * Liefert die Information, ob eine bestimmte Quest offen ist.
 * @since AppServer 82290, ChatServer 82290
 * @param {String} questKey
 * @return {Boolean} 
 */
QuestAccess.prototype.hasQuest = function(questKey) {};

/**
 * Liefert eine bestimmte Quest, falls vorhanden.
 * @since AppServer 82290, ChatServer 82290
 * @param {String} questKey
 * @return {Quest|null} quest
 */
QuestAccess.prototype.getQuest = function(questKey) {};

/**
 * Liefert den User, der zu diesem QuestAccess-Objekt gehört.
 * @since AppServer 82290, ChatServer 82290
 * @return {User} 
 */
QuestAccess.prototype.getUser = function() {};




/**
 * Repräsentiert einen KnuddelPot.
 * Ein KnuddelPot kann nur durch Factory-Methoden des KnuddelsServer erzeugt werden: 
 * KnuddelsServer/createKnuddelPot:method.
 * 
 * Wird die App heruntergefahren, so werden alle KnuddelPots, die nicht gesealt sind automatisch refunded.

 * @class KnuddelPot
 */
function KnuddelPot() {}

/**
 * Liefert die id des KnuddelPot.
 * @return {Number} id
 */
KnuddelPot.prototype.getId = function() {};

/**
 * Liefert den Status des KnuddelPot.
 * @return {KnuddelPotState} state
 */
KnuddelPot.prototype.getState = function() {};

/**
 * Liefert den beim Kreieren des KnuddelPots festgelegten KnuddelAmount, den jeder Teilnehmer zahlen muss.
 * @return {KnuddelAmount} 
 */
KnuddelPot.prototype.getKnuddelAmountPerParticipant = function() {};

/**
 * Liefert den KnuddelAmount, der bisher insgesamt in den KnuddelPot eingezahlt wurde.
 * @return {KnuddelAmount} 
 */
KnuddelPot.prototype.getKnuddelAmountTotal = function() {};

/**
 * Liefert die Liste der Teilnehmer, die bisher in den KnuddelPot eingezahlt haben.
 * @return {User[]} 
 */
KnuddelPot.prototype.getParticipants = function() {};

/**
 * Liefert den höchsten Multiplikator, der gültig ist.
 * @return {Number} 
 */
KnuddelPot.prototype.getMaxFeeMultiplier = function() {};

/**
 * Setzt den BotUser, der den Anteil der Einzahlungen nach dem Spiel erhält
 * und den Anteil, vom Gesamtpot, den er erhalten soll.
 * @param {BotUser} feeUser
 * @param {Number} feeMultiplier
 * @return {void} 
 */
KnuddelPot.prototype.setFee = function(feeUser, feeMultiplier) {};

/**
 * Liefert den mit KnuddelPot/setFee:method gesetzten BotUser an den die Gebühr ausbezahlt wird.
 * @return {User} 
 */
KnuddelPot.prototype.getFeeUser = function() {};

/**
 * Liefert den mit KnuddelPot/setFee:method gesetzten Multiplikator der Gebühr.
 * @return {Number} 
 */
KnuddelPot.prototype.getFeeMultiplier = function() {};

/**
 * Versiegelt den KnuddelPot, sodass keine weiteren Einzahlungen vorgenommen
 * werden können und Gewinne ausgeschüttet werden können.
 * @return {void} 
 */
KnuddelPot.prototype.seal = function() {};

/**
 * Bezahlt alle Einsätze an die Teilnehmer zurück und informiert mit dem übergeben Text über den Grund.
 * @param {String} [reason]
 * @return {void} 
 */
KnuddelPot.prototype.refund = function(reason) {};

/**
 * Fügt einen Gewinner in die Liste der Gewinner hinzu.
 * Der zweite Parameter ist die Gewichtung mit der ausgezahlt werden soll.
 * Wird der Parameter weggelassen, so ist er automatisch 1.
 * @param {User} user
 * @param {Number} [weight]
 * @return {void} 
 */
KnuddelPot.prototype.addWinner = function(user, weight) {};

/**
 * Zahlt den KnuddelPot an die mit addWinner gesetzten Gewinner aus.
 * @param {String} [text]
 * @return {void} 
 */
KnuddelPot.prototype.payout = function(text) {};




/**
 * Die Instanz von ExternalServerAccess erhält man über die KnuddelsServer.getExternalServerAccess().
 * Damit der Zugriff auf einen externern Server funktioniert, muss auf dem Server eine Datei knuddelsAccess.txt abgelegt werden, die die FTP-User-ID des Entwicklers enthält.

 * @class ExternalServerAccess
 */
function ExternalServerAccess() {}

/**
 * Liefert eine Liste aller zugreifbaren Domains
 * @return {Domain[]} 
 */
ExternalServerAccess.prototype.getAllAccessibleDomains = function() {};

/**
 * Prüft den Zugriff auf eine bestimmte URL. Wird je Kombination von "Protokoll + Host + Port" geprüft.
 * Beispiel: http://www.example.de:8080
 * @param {String} urlString
 * @return {Boolean} 
 */
ExternalServerAccess.prototype.canAccessURL = function(urlString) {};

/**
 * Macht einen GET-Request auf die übergebene URL und liefert den Inhalt zurück.
 * Diese Methode ist eine Convenience-Methode für externalServerAccess.callURL().
 * @param {String} urlString
 * @param {Object} [parameters]
 * @return {void} 
 */
ExternalServerAccess.prototype.getURL = function(urlString, parameters) {};

/**
 * Macht einen POST-Request auf die übergebene URL und liefert den Inhalt zurück.
 * Diese Methode ist eine Convenience-Methode für externalServerAccess.callURL().
 * @param {String} urlString
 * @param {Object} [parameters]
 * @return {void} 
 */
ExternalServerAccess.prototype.postURL = function(urlString, parameters) {};

/**
 * Macht einen GET-Request auf die übergebene URL. Im Gegensatz zum GET-Request wird der Inhalt der Webseite wird nicht ausgelesen.
 * Aus diesem Grund ist diese Methode schneller.
 * Diese Methode ist eine Convenience-Methode für externalServerAccess.callURL().
 * @param {String} urlString
 * @param {Object} [parameters]
 * @return {void} 
 */
ExternalServerAccess.prototype.touchURL = function(urlString, parameters) {};

/**
 * Macht einen Request auf die übergebene URL.
 * @param {String} urlString
 * @param {Object} [parameters]
 * @return {void} 
 */
ExternalServerAccess.prototype.callURL = function(urlString, parameters) {};




/**
 * Ein KnuddelTransfer ist ein Container-Objekt für die Daten, die bei einer Knuddel-Transaktion von einem User
 * an eine App anfallen.
 * 
 * Implementiert man den App-Hook onBeforeKnuddelReceived, so kann man dort entscheiden, ob man den KnuddelTransfer
 * annimmt oder ablehnt.

 * @class KnuddelTransfer
 */
function KnuddelTransfer() {}

/**
 * Liefert den User, der den KnuddelTransfer ausgelöst hat.
 * @return {User} 
 */
KnuddelTransfer.prototype.getSender = function() {};

/**
 * Liefert den BotUser, der die Knuddel des KnuddelTransfer erhält,
 * wenn dieser mit accept() angenommen wurde.
 * @return {BotUser} 
 */
KnuddelTransfer.prototype.getReceiver = function() {};

/**
 * Liefert die Anzahl der Knuddel, die mit diesem Transfer überwiesen werden.
 * @return {KnuddelAmount} 
 */
KnuddelTransfer.prototype.getKnuddelAmount = function() {};

/**
 * Liefert den Grund für den Transfer, der bei der Überweisung angegeben wurde mit
 * /appknuddel BOTNICK:KNUDDEL:GRUND.
 * @return {String} 
 */
KnuddelTransfer.prototype.getTransferReason = function() {};

/**
 * Lehnt die Knuddel aus dem KnuddelTransfer ab und sendet sie zurück an den Absender.
 * Als Grund sieht der Absender den übergebenen reason.
 * 
 * Diese Methode wirft eine Exception, wenn sie auf einen bereits verarbeiteten Transfer aufgerufen wird.
 * Sie kann nur erfolgreich aus dem AppHook onBeforeKnuddelReceived aufgerufen werden.
 * 
 * In der Methode onBeforeKnuddelReceived kann genau ein Aufruf einer dieser drei Methoden gemacht werden:
 * KnuddelTransfer/accept:method,
 * KnuddelTransfer/addToPot:method,
 * KnuddelTransfer/reject:method
 * @param {String} reason
 * @return {void} 
 */
KnuddelTransfer.prototype.reject = function(reason) {};

/**
 * Nimmt die Knuddel aus dem KnuddelTransfer an und übergibt sie an den BotUser,
 * der mit getReceiver() abgefragt werden kann.
 * 
 * Diese Methode wirft eine Exception, wenn sie auf einen bereits verarbeiteten Transfer aufgerufen wird.
 * Sie kann nur erfolgreich aus dem AppHook onBeforeKnuddelReceived aufgerufen werden.
 * In der Methode onBeforeKnuddelReceived kann genau ein Aufruf einer dieser drei Methoden gemacht werden:
 * 
 * KnuddelTransfer/accept:method,
 * KnuddelTransfer/addToPot:method,
 * KnuddelTransfer/reject:method
 * @return {void} 
 */
KnuddelTransfer.prototype.accept = function() {};

/**
 * Liefert die Information, ob ein bestimmter KnuddelTransfer zu einem KnuddelPot hinzugefügt werden kann.
 * @param {KnuddelPot} pot
 * @return {Boolean} 
 */
KnuddelTransfer.prototype.canAddToPot = function(pot) {};

/**
 * Nimmt die Knuddel aus dem KnuddelTransfer an und übergibt sie an den übergebenen KnuddelPot.
 * 
 * Diese Methode funktioniert analog zu KnuddelTransfer/accept:method, nur dass die Knuddel im KnuddelPot statt beim BotUser landen.
 * 
 * Diese Methode wirft eine Exception, wenn sie auf einen bereits verarbeiteten Transfer aufgerufen wird.
 * Sie kann nur erfolgreich aus dem AppHook onBeforeKnuddelReceived aufgerufen werden.
 * 
 * In der Methode onBeforeKnuddelReceived kann genau ein Aufruf einer dieser drei Methoden gemacht werden:
 * KnuddelTransfer/accept:method,
 * KnuddelTransfer/addToPot:method,
 * KnuddelTransfer/reject:method
 * @param {KnuddelPot} knuddelPot
 * @return {void} 
 */
KnuddelTransfer.prototype.addToPot = function(knuddelPot) {};

/**
 * Liefert die Information, ob der KnuddelTransfer bereits verarbeitet wurde.
 * Falls die Methode false zurückliefert muss noch entschieden werden, ob der
 * KnuddelTransfer angenommen oder abgelehnt wird.
 * @return {Boolean} 
 */
KnuddelTransfer.prototype.isProcessed = function() {};




/**
 * Die Instanz einer Domain beinhaltet alle relevanten Informationen zur Domain.

 * @class Domain
 */
function Domain() {}

/**
 * Liefert ein den Domain-Namen der aktuellen Domain.
 * @return {String} 
 */
Domain.prototype.getDomainName = function() {};




/**
 * Repräsentiert den Typ eines User.

 * @class UserType
 */
function UserType() {}

/**
 * Bot der App.

* @type {UserType}
*/
UserType.AppBot = 'AppBot';
/**
 * Bot des Knuddels-Chatsystems.

* @type {UserType}
*/
UserType.SystemBot = 'SystemBot';
/**
 * Menschlicher User.

* @type {UserType}
*/
UserType.Human = 'Human';



/**
 * Mit dieser Klasse ist es möglich nicht User-spezifische Abfragen auf die UserPersistence auszuführen.

 * @class UserPersistenceStrings
 */
function UserPersistenceStrings() {}

/**
 * Liefert die Information, ob für einen bestimmten key und value bei einem beliebigen Nutzer eine Paarung existiert.
 * @static
 * @since AppServer 88571
 * @param {String} key
 * @param {String} value
 * @param {Boolean} [ignoreCase]
 * @return {Boolean} Information, ob Eintrag existiert.
 */
UserPersistenceStrings.exists = function(key, value, ignoreCase) {};

/**
 * Löscht alle gespeicherten Strings für den übergebenen key.
 * @static
 * @since AppServer 82478
 * @param {String} key
 * @return {Number} Anzahl der gelöschten Einträge
 */
UserPersistenceStrings.deleteAll = function(key) {};

/**
 * Liefert alle keys, die für User in der Persistence
 * gespeichert wurden.
 * @static
 * @since AppServer 82483
 * @param {String} [filterKey]
 * @return {String[]} Liste mit allen keys
 */
UserPersistenceStrings.getAllKeys = function(filterKey) {};




/**
 * Ein BotUser repräsentiert einen Nutzer, der für die App als Nutzer im Channel interagieren kann.
 * 
 * Die Instanz für den Standard-BotUser erhält man über das KnuddelsServer-Objekt
 * mit KnuddelsServer.getDefaultBotUser()

 * @class BotUser
 * @extends User
 */
function BotUser() {}
BotUser.prototype = new User;

/**
 * Sendet eine öffentliche Nachricht in den Channel.
 * @param {String} message
 * @return {void} 
 */
BotUser.prototype.sendPublicMessage = function(message) {};

/**
 * Sendet eine öffentliche Handlung in den Channel.
 * Dies funktioniert so, als ob der BotUser /me TEXT im Chat eingeben würde.
 * @param {String} actionMessage
 * @return {void} 
 */
BotUser.prototype.sendPublicActionMessage = function(actionMessage) {};

/**
 * Sendet eine private Nachricht an bestimmte Nutzer.
 * @param {String} message
 * @param {User[]} [users]
 * @return {void} 
 */
BotUser.prototype.sendPrivateMessage = function(message, users) {};

/**
 * Sendet eine persistente Nachricht an einen bestimmten Nutzer.
 * @param {String} topic
 * @param {String} text
 * @param {User} [receivingUser]
 * @return {void} 
 */
BotUser.prototype.sendPostMessage = function(topic, text, receivingUser) {};

/**
 * Transferiert eine bestimmte Anzahl Knuddel an einen Zielnutzer oder KnuddelAccount.
 * Wichtiger Hinweis: Sollte die App versuchen mehr Knuddel zu transferieren,
 * als sie besitzt, so wird der onError-Callback aufgerufen und die App transferiert so viele Knuddel, wie möglich.
 * Zudem werden die Schulden für den Channelbesitzer gemerkt. Sobald sich der Channelbesitzer einloggt, erhält er einen Hinweis über offene Schulden
 * und sollte diese direkt begleichen.
 * Hat ein Channelbesitzer eine gewisse Menge Schulden angesammelt, so schalten wir alle Apps in diesem Channel ab.
 * Es können nur Knuddel transferiert werden zu Nutzern mit UserType.Human.
 * @param {User|KnuddelAccount} receivingUserOrAccount
 * @param {KnuddelAmount} knuddelAmount
 * @param {Object} [parameters]
 * @return {void} 
 */
BotUser.prototype.transferKnuddel = function(receivingUserOrAccount, knuddelAmount, parameters) {};




/**
 * ClientType repräsentiert die Art der Chat-Verbindung des Users.
 * 
 * Eine Instanz von ClientType erhält man über das User-Objekt
 * mit user.getClientType()

 * @class ClientType
 */
function ClientType() {}

/**
 * Der User ist mit dem Java Applet im Chat.

* @type {ClientType}
*/
ClientType.Applet = 'Applet';
/**
 * Der User ist mit dem Browser im Chat (Mini-Chat, HTML-Chat).

* @type {ClientType}
*/
ClientType.Browser = 'Browser';
/**
 * Der User ist mit der Android-App im Chat.

* @type {ClientType}
*/
ClientType.Android = 'Android';
/**
 * Der User ist mit der iOS-App im Chat.

* @type {ClientType}
*/
ClientType.IOS = 'IOS';
/**
 * Der User ist nicht im Chat.

* @type {ClientType}
*/
ClientType.Offline = 'Offline';



/**
 * Ein User ist ein Nutzer des Chats, in dem die App läuft.

 * @class User
 */
function User() {}

/**
 * Liefert die eindeutige Nutzerkennung des Nutzers.
 * @return {Number} 
 */
User.prototype.getUserId = function() {};

/**
 * Liefert den Nicknamen des Nutzers.
 * @return {String} 
 */
User.prototype.getNick = function() {};

/**
 * Liefert das Alter des Nutzers. Bei Nutzern, die bereits sehr lange in der Plattform sind kann es vorkommen, dass kein Alter angegeben wurde. In diesem Fall ist das Alter 0.
 * @return {Number} 
 */
User.prototype.getAge = function() {};

/**
 * Liefert das Geschlecht des Nutzers.
 * @return {Gender} 
 */
User.prototype.getGender = function() {};

/**
 * Liefert den Zeitpunkt der Registrierung des Nutzers.
 * @return {Date} 
 */
User.prototype.getRegDate = function() {};

/**
 * Liefert den UserStatus des Nutzers.
 * @return {UserStatus} 
 */
User.prototype.getUserStatus = function() {};

/**
 * Liefert den UserType des Nutzers.
 * @return {UserType} 
 */
User.prototype.getUserType = function() {};

/**
 * Liefert den aktuellen ClientType des Nutzers oder Offline wenn er nicht im Chat online ist.
 * @return {ClientType} 
 */
User.prototype.getClientType = function() {};

/**
 * Prüft ob der Client des Users den übergebenen AppViewMode (für User/sendAppContent:method) anzeigen kann.
 * @param {AppViewMode} mode
 * @return {Boolean} 
 */
User.prototype.canShowAppViewMode = function(mode) {};

/**
 * Prüft ob der Client des User's den übergebenen AppContent anzeigen kann.
 * @param {AppContent} appContent
 * @return {Boolean} 
 */
User.prototype.canSendAppContent = function(appContent) {};

/**
 * Prüft, ob der User in dem angegebenen Team ist.
 * Dies funktioniert derzeit nur für Teams, die eine eigene /fa haben.
 * 
 * Achtung: Bei Nutzern, die neu in ein Team kommen, funktioniert die Abfrage erst dann korrekt,
 * wenn er sich neu in den Channel eingeloggt hat.
 * @param {String} teamName
 * @param {String} [subTeamName]
 * @return {Boolean} 
 */
User.prototype.isInTeam = function(teamName, subTeamName) {};

/**
 * Liefert ein UserPersistence-Objekt für diesen Nutzer. Mit diesem Objekt kann eine App sich Dinge über diesen speziellen Nutzer merken.
 * @return {UserPersistence} 
 */
User.prototype.getPersistence = function() {};

/**
 * Shortcut-Funktion um mit dem DefaultBotUser eine private Nachricht zu versenden.
 * @param {String} message
 * @return {void} 
 */
User.prototype.sendPrivateMessage = function(message) {};

/**
 * Shortcut-Funktion um mit dem DefaultBotUser eine /m zu versenden.
 * @param {String} topic
 * @param {String} text
 * @return {void} 
 */
User.prototype.sendPostMessage = function(topic, text) {};

/**
 * Liefert die Information, ob dieser Nutzer Channelbesitzer im Channel der App ist.
 * @return {Boolean} 
 */
User.prototype.isChannelOwner = function() {};

/**
 * Liefert die Information, ob der Channel der App
 *  ein Lieblingschannel des Nutzers ist.
 * @return {Boolean} 
 */
User.prototype.isLikingChannel = function() {};

/**
 * Liefert die Information, ob der Nutzer im harten Kern des Channels der App ist.
 * @since AppServer 92701, ChatServer 92701
 * @return {Boolean} 
 */
User.prototype.isChannelCoreUser = function() {};

/**
 * Liefert die Information, ob dieser Nutzer ein AppManager für diese App ist. Die Channelbesitzer zählen automatisch auch als AppManager.
 * @return {Boolean} 
 */
User.prototype.isAppManager = function() {};

/**
 * Liefert Information, ob dieser Nutzer derzeit für das Schreiben öffentlicher Nachrichten im Channel gesperrt ist.
 * @return {Boolean} 
 */
User.prototype.isMuted = function() {};

/**
 * Liefert Information, ob dieser Nutzer beim Schreiben öffentlicher Nachrichten im Channel
 * derzeit für die Verwendung von Textformatierungen, Farben und Smileys gesperrt ist.
 * @return {Boolean} 
 */
User.prototype.isColorMuted = function() {};

/**
 * Liefert Information, ob dieser Nutzer derzeit für das Betreten des Channel gesperrt ist.
 * @return {Boolean} 
 */
User.prototype.isLocked = function() {};

/**
 * Liefert Information, ob dieser Nutzer Channelmoderator im Channel der App ist.
 * @return {Boolean} 
 */
User.prototype.isChannelModerator = function() {};

/**
 * Liefert Information, ob dieser Nutzer Eventmoderator im Channel der App ist.
 * @return {Boolean} 
 */
User.prototype.isEventModerator = function() {};

/**
 * Liefert Information, ob dieser Nutzers der Entwickler der App ist.
 * @return {Boolean} 
 */
User.prototype.isAppDeveloper = function() {};

/**
 * Liefert einen Link zum Profil des Nutzers, den man im Chat anzeigen kann.
 * @param {String} [displayText]
 * @return {String} 
 */
User.prototype.getProfileLink = function(displayText) {};

/**
 * Liefert die Information, ob der Nutzer online im Channel der App ist.
 * @return {Boolean} 
 */
User.prototype.isOnlineInChannel = function() {};

/**
 * Liefert die Anzahl der Knuddel, die der Nutzer besitzt.
 * @return {KnuddelAmount} Anzahl der Knuddel
 */
User.prototype.getKnuddelAmount = function() {};

/**
 * Liefert die Information, ob der Nutzer irgendwo im Chat online ist.
 * @return {Boolean} true, falls der Nutzer online ist.
 */
User.prototype.isOnline = function() {};

/**
 * Liefert die Readme des Nutzers, die er mit /readme TEXT in sein Profil gesetzt hat.
 * @return {String} Readme des Nutzers
 */
User.prototype.getReadme = function() {};

/**
 * Liefert die vom Nutzer verbrachte Zeit im gesamten Chatsystem In Minuten.
 * Hinweis: Die Minutenzahl wird derzeit immer nur zu dem Zeitpunkt aktualisiert,
 * wenn der Nutzer offline geht.
 * @return {Number} 
 */
User.prototype.getOnlineMinutes = function() {};

/**
 * Liefert die Information, ob der Nutzer sich mittels /away-Funktion kurz abgemeldet hat.
 * @return {Boolean} 
 */
User.prototype.isAway = function() {};

/**
 * Liefert die Information, ob der Nutzer ein Profilfoto hat.
 * @return {Boolean} 
 */
User.prototype.hasProfilePhoto = function() {};

/**
 * (Er)setzt den übergebenen AppContent beim Nutzer.
 * @param {AppContent} appContent
 * @return {AppContentSession} appContentSession, null, falls die interne Prüfung von canShowAppContent false geliefert hat
 */
User.prototype.sendAppContent = function(appContent) {};

/**
 * Liefert alle AppContentSession, die der User
 * aktuell geöffnet hat.
 * @return {AppContentSession[]} 
 */
User.prototype.getAppContentSessions = function() {};

/**
 * Liefert die AppContentSession, die der User
 * mit einem bestimmten AppViewMode aktuell geöffnet hat.
 * @param {AppViewMode} appViewMode
 * @return {AppContentSession} appContentSession für übergebenen AppViewMode, ansonsten null
 */
User.prototype.getAppContentSession = function(appViewMode) {};

/**
 * Sendet Daten an den verbundenen Client.
 * @param {String} type
 * @param {Object} data
 * @return {void} 
 */
User.prototype.sendEvent = function(type, data) {};

/**
 * Entfernt den aktuell sichtbaren AppContent beim Nutzer.
 * @return {void} 
 */
User.prototype.removeAppContent = function() {};

/**
 * Vergleicht den übergebenen Nutzer und liefert true, falls der übergebene Nutzer
 * identisch ist mit dem aktuellen Nutzer.
 * @param {User} user
 * @return {Boolean} 
 */
User.prototype.equals = function(user) {};

/**
 * Liefert die URL zum Profilfoto des Nutzers. Die übergebene Breite und Höhe
 * liefern dem Server einen Anhaltswert, um das bestmögliche Foto zu finden,
 * sind aber keine Garantie, dass das Foto diese Ausmaße haben wird.
 * @param {Number} width
 * @param {Number} height
 * @return {String} 
 */
User.prototype.getProfilePhoto = function(width, height) {};

/**
 * Liefert das QuestAccess-Objekt
 * für diesen Nutzer in dieser App.
 * @since AppServer 82290, ChatServer 82290
 * @return {QuestAccess} questAccess
 */
User.prototype.getQuestAccess = function() {};

/**
 * Liefert die Information, ob der Nutzer gerade sein Video streamt.
 * @return {Boolean} 
 */
User.prototype.isStreamingVideo = function() {};

/**
 * Liefert den KnuddelAccount des Nutzers.
 * @return {KnuddelAccount} 
 */
User.prototype.getKnuddelAccount = function() {};

/**
 * Liefert die ChannelTalkPermission für diesen Nutzer in diesem
 * Channel.
 * @return {ChannelTalkPermission} 
 */
User.prototype.getChannelTalkPermission = function() {};

/**
 * Liefert die Information, ob der User ein verifiziertes Profilbild hat.
 * @return {Boolean} 
 */
User.prototype.isProfilePhotoVerified = function() {};

/**
 * Liefert die Information, ob das Alter des Users verifiziert ist.
 * @return {Boolean} 
 */
User.prototype.isAgeVerified = function() {};

/**
 * Setzt dem Nutzer ein Icon in die Nickliste, das auf der rechten Seite seines Nicks angezeigt wird.
 * Der Eintrag wird automatisch entfernt, sobald der Nutzer den Channel verlässt,
 * kann aber auch mit User/removeNicklistIcon:method
 * entfernt werden.
 * @param {String} imagePath
 * @param {Number} imageWidth
 * @return {void} 
 */
User.prototype.addNicklistIcon = function(imagePath, imageWidth) {};

/**
 * Entfernt dem Nutzer ein über die API gesetztes Icon in die Nickliste.
 * @param {String} imagePath
 * @return {void} 
 */
User.prototype.removeNicklistIcon = function(imagePath) {};

/**
 * Startet einen Würfelwurf für den Nutzer, falls er online im Channel ist und er nicht gemuted ist.
 * @since AppServer 89159, ChatServer 89159
 * @param {DiceConfiguration} diceConfiguration
 * @return {void} 
 */
User.prototype.triggerDice = function(diceConfiguration) {};




/**
 * Message ist eine abstrakte Klasse und repräsentiert eine Nachricht im Chat.

 * @class Message
 */
function Message() {}

/**
 * Liefert den User, der die Nachricht verfasst hat.
 * @return {User} 
 */
Message.prototype.getAuthor = function() {};

/**
 * Liefert den Inhalt der Nachricht.
 * @return {String} 
 */
Message.prototype.getText = function() {};

/**
 * Liefert den genauen Zeitpunkt, zu dem die Nachricht erstellt wurde.
 * @return {Date} 
 */
Message.prototype.getCreationDate = function() {};




/**
 * Liefert Informationen über einen Server.

 * @class ServerInfo
 */
function ServerInfo() {}

/**
 * Liefert die interne ServerId des Servers.
 * @return {String} 
 */
ServerInfo.prototype.getServerId = function() {};

/**
 * Liefert die Code-Revision des Servers.
 * @return {Number} 
 */
ServerInfo.prototype.getRevision = function() {};




/**
 * Eine Instanz einer DiceConfigurationFactory kann zur Unterstützung genutzt werden, um eine
 * DiceConfiguration zu erzeugen.

 * @class DiceConfigurationFactory
 */
function DiceConfigurationFactory() {}

/**
 * Fügt der Konfiguration einen Würfel hinzu.
 * @param {Dice} dice
 * @return {void} 
 */
DiceConfigurationFactory.prototype.addDice = function(dice) {};

/**
 * Liefert die Anzahl der Würfel, die zur Konfiguration gehören.
 * @return {Number} 
 */
DiceConfigurationFactory.prototype.computeCurrentDiceCount = function() {};

/**
 * Setzt die Information, ob ein offener Wurf oder ein normaler Wurf stattfinden soll.
 * Offene Würfelwürfe sind speziell. Falls die Augenzahl des Würfels die Maximalsumme zeigt,
 * so wird noch einmal gewürfelt und die neue Zahl dazu addiert, solange bis der Würfel
 * nicht mehr die Maximalsumme zeigt.
 * 
 * Beispiel: /diceo 1w4 -> 4 -> 4 -> 3 = 11
 * @param {Boolean} shouldUseOpenThrow
 * @return {void} 
 */
DiceConfigurationFactory.prototype.setUseOpenThrow = function(shouldUseOpenThrow) {};

/**
 * Setzt die Information, ob ein offener Wurf oder ein normaler Wurf stattfinden soll.
 * Offene Würfelwürfe sind speziell. Falls die Augenzahl des Würfels die Maximalsumme zeigt,
 * so wird noch einmal gewürfelt und die neue Zahl dazu addiert, solange bis der Würfel
 * nicht mehr die Maximalsumme zeigt.
 * 
 * Beispiel: /diceo 1w4 -> 4 -> 4 -> 3 = 11
 * @param {Boolean} shouldUseOpenThrow
 * @return {void} 
 */
DiceConfigurationFactory.prototype.setUseOpenThrows = function(shouldUseOpenThrow) {};

/**
 * Setzt die Information, ob der Würfelwurf privat stattfinden soll.
 * @param {Boolean} shouldUsePrivateThrow
 * @return {void} 
 */
DiceConfigurationFactory.prototype.setShouldUsePrivateThrow = function(shouldUsePrivateThrow) {};

/**
 * Liefert die erzeugte Würfelkonfiguration.
 * @return {DiceConfiguration} 
 */
DiceConfigurationFactory.prototype.getDiceConfiguration = function() {};

/**
 * Erzeugt eine Würfelkonfiguration.
 * @static
 * @param {String} diceConfigurationString
 * @return {DiceConfiguration} 
 */
DiceConfigurationFactory.fromString = function(diceConfigurationString) {};




/**
 * null

 * @class AppViewMode
 */
function AppViewMode() {}

/**
 * 

* @type {AppViewMode}
*/
AppViewMode.Overlay = 'Overlay';
/**
 * Zum Öffnen eines Popups durch das HTML User Interface

* @type {AppViewMode}
*/
AppViewMode.Popup = 'Popup';



/**
 * Diese Klasse repräsentiert einen Eintrag der Persistenz.

 * @class UserPersistenceNumberEntry
 */
function UserPersistenceNumberEntry() {}

/**
 * Liefert den Nutzer.
 * @return {User} 
 */
UserPersistenceNumberEntry.prototype.getUser = function() {};

/**
 * Liefert den Wert.
 * @return {Number} 
 */
UserPersistenceNumberEntry.prototype.getValue = function() {};

/**
 * Liefert den Rang des Elements in der Persistenz.
 * @return {Number} 
 */
UserPersistenceNumberEntry.prototype.getRank = function() {};

/**
 * Liefert die Position des Elements in der Persistenz.
 * @return {Number} 
 */
UserPersistenceNumberEntry.prototype.getPosition = function() {};




/**
 * Eine Instanz von PublicMessage repräsentiert eine öffentliche Nachricht im Chat.
 * Die App erhält die öffentlichen Nachrichten, die geschrieben werden.

 * @class PublicMessage
 * @extends Message
 */
function PublicMessage() {}
PublicMessage.prototype = new Message;




/**
 * Eine Instanz eines Logger ermöglicht das Loggen von Inhalten.
 * 
 * Diese erhält man über das KnuddelsServer-Objekt
 * mit KnuddelsServer.getDefaultLogger()
 * 
 * Die Log-Einträge werden je nach Einstellungen im /apps-Fenster an den Besitzer des Channels,
 * die App-Manager und den App-Entwickler zugestellt.

 * @class Logger
 */
function Logger() {}

/**
 * Logge einen Text mit Level DEBUG. Dieser wird im Chat allen dafür registrierten AppManagern per /p vom App-Logs-User zugestellt. Siehe: /apps, Tab: Logs.
 * 
 * Die Methode erwartet beliebig viele Strings als Parameter. Diese werden vor dem Logging mit einem Leerzeichen gejoint.
 * @param {Object} msg
 * @return {void} 
 */
Logger.prototype.debug = function(msg) {};

/**
 * Logge einen Text mit Level INFO. Dieser wird im Chat allen dafür registrierten AppManagern per /p vom App-Logs-User zugestellt. Siehe: /apps, Tab: Logs.
 * 
 * Die Methode erwartet beliebig viele Strings als Parameter. Diese werden vor dem Logging mit einem Leerzeichen gejoint.
 * @param {Object} msg
 * @return {void} 
 */
Logger.prototype.info = function(msg) {};

/**
 * Logge einen Text mit Level WARN. Dieser wird im Chat allen dafür registrierten AppManagern per /p vom App-Logs-User zugestellt, sowie im /apps Fenster im Log angezeigt. Siehe: /apps, Tab: Logs.
 * 
 * Die Methode erwartet beliebig viele Strings als Parameter. Diese werden vor dem Logging mit einem Leerzeichen gejoint.
 * @param {String} msg
 * @return {void} 
 */
Logger.prototype.warn = function(msg) {};

/**
 * Logge einen Text mit Level ERROR. Dieser wird im Chat allen dafür registrierten AppManagern per /p vom App-Logs-User zugestellt, sowie im /apps Fenster im Log angezeigt. Siehe: /apps, Tab: Logs.
 * 
 * Die Methode erwartet beliebig viele Strings als Parameter. Diese werden vor dem Logging mit einem Leerzeichen gejoint.
 * @param {Object} msg
 * @return {void} 
 */
Logger.prototype.error = function(msg) {};

/**
 * Logge einen Text mit Level FATAL. Dieser wird im Chat allen dafür registrierten AppManagern per /p vom App-Logs-User zugestellt, sowie im /apps Fenster im Log angezeigt. Siehe: /apps, Tab: Logs.
 * 
 * Die Methode erwartet beliebig viele Strings als Parameter. Diese werden vor dem Logging mit einem Leerzeichen gejoint.
 * @param {Object} msg
 * @return {void} 
 */
Logger.prototype.fatal = function(msg) {};




/**
 * Eine Instanz von DiceConfiguration repräsentiert eindeutig eine Konfiguration zum würfeln.
 * Wurde gewürfelt, so können die Konfigurationen verglichen werden, um zu prüfen, ob exakt die Würfel
 * gewürfelt wurden, die gewürfelt werden sollten.

 * @class DiceConfiguration
 */
function DiceConfiguration() {}

/**
 * Informiert, ob es sich um einen offenen Würfelwurf handelt.
 * Offene Würfelwürfe sind speziell. Falls die Augenzahl des Würfels die Maximalsumme zeigt,
 * so wird noch einmal gewürfelt und die neue Zahl dazu addiert, solange bis der Würfel
 * nicht mehr die Maximalsumme zeigt.
 * 
 * Beispiel: /diceo 1w4 -> 4 -> 4 -> 3 = 11
 * @return {Boolean} 
 */
DiceConfiguration.prototype.isUsingOpenThrow = function() {};

/**
 * Informiert darüber, ob die Würfel privat geworfen worden sind.
 * Würfelwürfe zählen als privat, wenn am Ende des Würfelbefehls ein Ausrufezeichen steht.
 * Beispiel: /dice 10w2!
 * @return {Boolean} 
 */
DiceConfiguration.prototype.isUsingPrivateThrow = function() {};

/**
 * Liefert ein Array mit Würfeln, mit denen gewürfelt wurde.
 * @return {Dice[]} 
 */
DiceConfiguration.prototype.getDices = function() {};

/**
 * Vergleicht, ob zwei Konfigurationen inhaltlich identisch sind
 * @param {DiceConfiguration} diceConfiguration
 * @return {Boolean} 
 */
DiceConfiguration.prototype.equals = function(diceConfiguration) {};

/**
 * Liefert den Befehl, der im Chat eingegeben werden kann, um einen Wurf auszuführen,
 * der zur DiceConfiguration passt.
 * @since AppServer 82248
 * @return {String} 
 */
DiceConfiguration.prototype.getChatCommand = function() {};




/**
 * ChannelTalkPermission repräsentiert das Rederecht eines User
 * im Channel.

 * @class ChannelTalkPermission
 */
function ChannelTalkPermission() {}

/**
 * Der User ist gerade nicht im Channel,
 * daher ist die ChannelTalkPermission nicht bekannnt.

* @type {ChannelTalkPermission}
*/
ChannelTalkPermission.NotInChannel = 'NotInChannel';
/**
 * Der User hat keine speziellen Rederechte.
 * Beim ChannelTalkMode Default können diese User
 * Nachrichten verfassen:

* @type {ChannelTalkPermission}
*/
ChannelTalkPermission.Default = 'Default';
/**
 * Der User kann eine öffentliche Nachricht verfassen. Danach wechselt die
 * ChannelTalkPermission automatisch auf Default.

* @type {ChannelTalkPermission}
*/
ChannelTalkPermission.TalkOnce = 'TalkOnce';
/**
 * Der User kann permanent öffentliche Nachrichten verfassen.

* @type {ChannelTalkPermission}
*/
ChannelTalkPermission.TalkPermanent = 'TalkPermanent';
/**
 * Der User ist VIP und kann öffentliche Nachrichten verfassen,
 * die farbig und groß dargestellt werden.

* @type {ChannelTalkPermission}
*/
ChannelTalkPermission.VIP = 'VIP';
/**
 * Der User ist VIP und kann öffentliche Nachrichten verfassen,
 * die farbig und groß dargestellt werden. Moderatoren haben zudem weitere Möglichkeiten, die in der
 * Anleitung zum Moderationssystem
 * nachgelesen werden können.

* @type {ChannelTalkPermission}
*/
ChannelTalkPermission.Moderator = 'Moderator';



/**
 * Repräsentiert die Instanz der konkreten App, auf die dieser Code Zugriff hat.
 * 
 * Die Instanz von OwnAppInstance erhält man über das AppAccess-Objekt
 * mit appAccess.getOwnInstance()

 * @class OwnAppInstance
 */
function OwnAppInstance() {}

/**
 * Gibt Zugriff auf Nutzer, die gerade im Channel dieser AppInstance online sind.
 * @since AppServer 82560
 * @param {AppInstance} otherAppInstance
 * @param {UserType} [userType...]
 * @return {User[]} 
 */
OwnAppInstance.prototype.getOnlineUsers = function(otherAppInstance, userType /* ... */) {};




/**
 * Repräsentiert eine HTML-Datei, die auf dem Server im Ordner /www liegt.

 * @class HTMLFile
 */
function HTMLFile() {}

/**
 * 
 * @param {String} assetPath
 * @param {Object} [pageData]
 * @return {HTMLFile} 
 */
HTMLFile.prototype.HTMLFile = function(assetPath, pageData) {};

/**
 * Liefert den Pfad, der beim Anlegen der HTMLFile-Instanz genutzt wurde.
 * @return {String} assetPath
 */
HTMLFile.prototype.getAssetPath = function() {};

/**
 * Liefert die pageData, die beim Anlegen der HTMLFile-Instanz genutzt wurden.
 * @return {Object} pageData
 */
HTMLFile.prototype.getPageData = function() {};




/**
 * Die Instanz von ExternalServerResponse erhält in den onSuccess- und onFailure-Callbacks der Methoden von 
 * ExternalServerAccess. Es enthält alle notwendigen Daten zum Verarbeiten.

 * @class ExternalServerResponse
 */
function ExternalServerResponse() {}

/**
 * Liefert die abgefragte URL.
 * @return {String} 
 */
ExternalServerResponse.prototype.getURLString = function() {};

/**
 * Liefert den HTTP-Statuscode der Seite.
 * @return {Number} var responseCode = externalServerResponse.getResponseCode(); // i.e. 200
 */
ExternalServerResponse.prototype.getResponseCode = function() {};

/**
 * Liefert ein Objekt, das die Headerdaten der Antwort enthält.
 * @return {Object} 
 */
ExternalServerResponse.prototype.getHeaderFields = function() {};




/**
 * Mit einer Instanz einer LoadConfiguration kann gestaltet werden, wie der Inhalt des HTML User Interface aussieht, bevor es fertig geladen ist.

 * @class LoadConfiguration
 */
function LoadConfiguration() {}

/**
 * Setzt die Farbe des Hintergrundes vom Loading-View, der angezeigt wird, während das HTML User Interface lädt. (standardmäßig weiß)
 * @param {Color} color
 * @return {void} 
 */
LoadConfiguration.prototype.setBackgroundColor = function(color) {};

/**
 * Setzt das Hintergrundbild vom Loading-View, das angezeigt wird, während das HTML User Interface lädt. (standardmäßig nicht gesetzt)
 * @param {String} imageUrl
 * @return {void} 
 */
LoadConfiguration.prototype.setBackgroundImage = function(imageUrl) {};

/**
 * Setzt den Text des Ladehinweiseses im Loading-View, der angezeigt wird, während das HTML User Interface lädt. (standardmäßig "Lädt...")
 * Hinweis: Wird mit setLoadingIndicatorImage ein Loaading-Indicator-Bild gesetzt, so wird der mit setText gesetzte Texte ignoriert.
 * @param {String} text
 * @return {void} 
 */
LoadConfiguration.prototype.setText = function(text) {};

/**
 * Setzt ein Loading-Indicator-Bild im Loading-View, das angezeigt wird, während das HTML User Interface lädt. (standardmäßig nicht gesetzt)
 * Hinweis: Wird mit setLoadingIndicatorImage ein Loaading-Indicator-Bild gesetzt, so wird der mit setText gesetzte Texte ignoriert.
 * @param {String} imageUrl
 * @return {void} 
 */
LoadConfiguration.prototype.setLoadingIndicatorImage = function(imageUrl) {};

/**
 * Setzt die Farbe des Textes im Loading-View, der angezeigt wird, während das HTML User Interface lädt. (standardmäßig schwarz)
 * @param {Color} color
 * @return {void} 
 */
LoadConfiguration.prototype.setForegroundColor = function(color) {};

/**
 * Aktiviert/Deaktiviert die Nutzung vom Loading-View. (standardmäßig aktiviert)
 * Es kann sinnvoll sein, den Loading-View zu deaktivieren, wenn man selbst einen komplett eigenen Loading-View in seine App einbauen möchte.
 * @param {Boolean} enabled
 * @return {void} 
 */
LoadConfiguration.prototype.setEnabled = function(enabled) {};




/**
 * Ermöglicht Zugriff auf Designeinstellungen des Channels.

 * @class ChannelDesign
 * @since AppServer 87470, ChatServer 87470
 */
function ChannelDesign() {}

/**
 * Liefert die eingestellte Standard-Schriftgröße des Channels.
 * @since AppServer 87470, ChatServer 87470
 * @return {Number} default font size
 */
ChannelDesign.prototype.getDefaultFontSize = function() {};

/**
 * Liefert die eingestellte Standard-Schriftfarbe des Channels.
 * @since AppServer 87470, ChatServer 87470
 * @return {Color} default font color
 */
ChannelDesign.prototype.getDefaultFontColor = function() {};

/**
 * Liefert die eingestellte Hintergrundfarbe des Channels.
 * @since AppServer 87470, ChatServer 87470
 * @return {Color} background color
 */
ChannelDesign.prototype.getBackgroundColor = function() {};




/**
 * Eine Instanz von PublicActionMessage repräsentiert eine öffentliche Handlung im Chat.
 * Die App erhält die öffentlichen Handlungen.

 * @class PublicActionMessage
 * @extends Message
 */
function PublicActionMessage() {}
PublicActionMessage.prototype = new Message;




/**
 * VideoChannelData hält Informationen zu laufenden Video-Streams im Channel bereit.

 * @class VideoChannelData
 */
function VideoChannelData() {}

/**
 * Liefert alle User die im Channel derzeit ihr Video streamen.
 * @return {User[]} 
 */
VideoChannelData.prototype.getStreamingVideoUsers = function() {};




/**
 * ChannelTalkMode repräsentiert das den Gesprächsmodus im Channel.
 * 
 * Die Instanz für die ChannelTalkMode erhält man über das Channel-Objekt
 * mit channel.getTalkMode()

 * @class ChannelTalkMode
 */
function ChannelTalkMode() {}

/**
 * Jeder darf gerade im Channel schreiben.

* @type {ChannelTalkMode}
*/
ChannelTalkMode.Everyone = 'Everyone';
/**
 * Nur Personen, die besondere Rederechte haben dürfen gerade im Channel schreiben.

* @type {ChannelTalkMode}
*/
ChannelTalkMode.OnlyWithTalkPermission = 'OnlyWithTalkPermission';
/**
 * Nur Personen, die besondere Rederechte haben dürfen gerade im Channel schreiben.
 * Die Nachrichten aller anderen Nutzer werden gefiltert und ggf. von den Moderatoren zugelassen.

* @type {ChannelTalkMode}
*/
ChannelTalkMode.FilteredByModerators = 'FilteredByModerators';



/**
 * Eine Instanz von ChannelRestrictions ermöglicht es, aktuelle Informationen über Nutzungsbeschränkungen im Channel zu erhalten.
 * 
 * Die Instanz für die ChannelRestrictions erhält man über das Channel-Objekt
 * mit channel.getChannelRestrictions()

 * @class ChannelRestrictions
 */
function ChannelRestrictions() {}

/**
 * Liefert alle User die im Channel derzeit für das Schreiben öffentlicher Nachrichten gesperrt sind.
 * @return {User[]} 
 */
ChannelRestrictions.prototype.getMutedUsers = function() {};

/**
 * Liefert alle User die im Channel derzeit für das Nutzen
 * von Farben, Textformatierung und Smileys in öffentlichen Nachrichten gesperrt sind.
 * @return {User[]} 
 */
ChannelRestrictions.prototype.getColorMutedUsers = function() {};

/**
 * Liefert alle User die für das Betreten des Channel derzeit gesperrt sind.
 * @return {User[]} 
 */
ChannelRestrictions.prototype.getLockedUsers = function() {};




/**
 * KnuddelTransferDisplayType repräsentiert die Art der Darstellung einer Knuddel-Überweisung.

 * @class KnuddelTransferDisplayType
 */
function KnuddelTransferDisplayType() {}

/**
 * Nachricht wird öffentlich angezeigt.

* @type {KnuddelTransferDisplayType}
*/
KnuddelTransferDisplayType.Public = 'Public';
/**
 * Nachricht wird privat angezeigt.

* @type {KnuddelTransferDisplayType}
*/
KnuddelTransferDisplayType.Private = 'Private';
/**
 * Nachricht wird als /m zugestellt.

* @type {KnuddelTransferDisplayType}
*/
KnuddelTransferDisplayType.Post = 'Post';



/**
 * Eine Instanz von Dice repräsentiert die Anzahl an Würfeln von einerm bestimmten Typ.

 * @class Dice
 */
function Dice() {}

/**
 * Erzeugt ein Dice-Objekt mit der übergebenen Anzahl Würfel und Augenzahl.
 * @param {Number} [count]
 * @param {Number} value
 * @return {Dice} 
 */
Dice.prototype.Dice = function(count, value) {};

/**
 * Liefert die Anzahl der Würfel.
 * @return {Number} 
 */
Dice.prototype.getAmount = function() {};

/**
 * Liefert die Anzahl der Seiten der Würfel.
 * @return {Number} 
 */
Dice.prototype.getNumberOfSides = function() {};




/**
 * Die Instanz für die ChannelRights erhält man über das ChannelConfiguration-Objekt
 * mit channelConfiguration.getChannelRights()

 * @class ChannelRights
 */
function ChannelRights() {}

/**
 * Liefert die Liste aller Channelbesitzer. In öffentlichen Channels sind dies alle hauptzuständigen betreuenden Mitglieder. (HZA/HZE)
 * @return {User[]} 
 */
ChannelRights.prototype.getChannelOwners = function() {};

/**
 * Liefert die Liste aller Channel-Moderatoren.
 * @return {User[]} 
 */
ChannelRights.prototype.getChannelModerators = function() {};

/**
 * Liefert die Liste aller Event-Moderatoren.
 * @return {User[]} 
 */
ChannelRights.prototype.getEventModerators = function() {};




/**
 * Mit dieser Klasse ist es möglich nicht User-spezifische Abfragen auf die UserPersistence auszuführen.

 * @class UserPersistenceObjects
 */
function UserPersistenceObjects() {}

/**
 * Löscht alle gespeicherten Objekte für den übergebenen key.
 * @static
 * @since AppServer 82478
 * @param {String} key
 * @return {Number} Anzahl der gelöschten Einträge
 */
UserPersistenceObjects.deleteAll = function(key) {};

/**
 * Liefert alle keys, die für User in der Persistence
 * gespeichert wurden.
 * @static
 * @since AppServer 82483
 * @param {String} [filterKey]
 * @return {String[]} Liste mit allen keys
 */
UserPersistenceObjects.getAllKeys = function(filterKey) {};




/**
 * Eine Quest ist eine konkrete Aufgabe, die ein  User in der App zu erledigen hat.
 * 
 * Im Blog findest du Informationen darüber, wie man eine Quest für seine App erhält:
 * https://blog.developer.knuddels.de/2015/10/29/how-to-get-a-quest/

 * @class Quest
 */
function Quest() {}

/**
 * Löst ein Quest-Event aus.
 * @since AppServer 82290, ChatServer 82290
 * @param {Number} [count]
 * @return {void} 
 */
Quest.prototype.setSolved = function(count) {};

/**
 * Liefert den Key der Quest.
 * @since AppServer 82290, ChatServer 82290
 * @return {String} questKey
 */
Quest.prototype.getQuestKey = function() {};




/**
 * Ermöglicht Zugriff auf Informationen zu Apps und Events zwischeneinander.
 * 
 * Die Instanz von AppAccess erhält man über den KnuddelsServer
 * mit KnuddelsServer.getAppAccess()

 * @class AppAccess
 */
function AppAccess() {}

/**
 * Liefert die Instanz der eigenen App.
 * @return {AppInstance} Instanz der eigenen App
 */
AppAccess.prototype.getOwnInstance = function() {};

/**
 * Liefert die Instanzen aller anderen Apps, die gerade in diesem Channel laufen.
 * @since AppServer 82904
 * @param {Boolean} [includeSelf]
 * @return {AppInstance[]} Instanzen der anderen laufenden Apps
 */
AppAccess.prototype.getAllRunningAppsInChannel = function(includeSelf) {};

/**
 * Liefert die Instanzen aller anderen Apps, die gerade in diesem Channel laufen.
 * @since AppServer 82904
 * @param {String} appId
 * @return {AppInstance|null} Instanz der anderen laufenden App oder null
 */
AppAccess.prototype.getRunningAppInChannel = function(appId) {};




/**
 * Liefert Informationen über einen AppServer.
 * 
 * Die Instanz von AppServerInfo erhält man über den KnuddelsServer
 * mit KnuddelsServer.getAppServerInfo()

 * @class AppServerInfo
 * @extends ServerInfo
 */
function AppServerInfo() {}
AppServerInfo.prototype = new ServerInfo;




/**
 * Eine Instanz von KnuddelAmount repräsentiert eine bestimmte Anzahl von Knuddel.

 * @class KnuddelAmount
 */
function KnuddelAmount() {}

/**
 * Erzeugt eine Instanz von KnuddelAmount mit der Anzahl Knuddel.
 * @param {Number} knuddel
 * @return {KnuddelAmount} 
 */
KnuddelAmount.prototype.KnuddelAmount = function(knuddel) {};

/**
 * Erzeugt eine Instanz von KnuddelAmount mit einer bestimmten Cent-Anzahl.
 * @static
 * @param {Number} knuddel
 * @return {KnuddelAmount} 
 */
KnuddelAmount.fromCents = function(knuddel) {};

/**
 * Erzeugt eine Instanz von KnuddelAmount mit einer bestimmten Knuddel-Anzahl.
 * @static
 * @param {Number} knuddel
 * @return {KnuddelAmount} 
 */
KnuddelAmount.fromKnuddel = function(knuddel) {};

/**
 * Liefert die Anzahl der Knuddel in KnuddelCent zurück.
 * @return {Number} 
 */
KnuddelAmount.prototype.getKnuddelCents = function() {};

/**
 * Gibt den Wert der Knuddel als Zahl zurück.
 * @return {Number} 
 */
KnuddelAmount.prototype.asNumber = function() {};

/**
 * Liefert eine negierte Kopie des KnuddelAmount zurück.
 * @return {KnuddelAmount} 
 */
KnuddelAmount.prototype.negate = function() {};

/**
 * Liefert die Information, ob der Knuddelwert unter 0 ist.
 * @return {Boolean} 
 */
KnuddelAmount.prototype.isNegative = function() {};




/**
 * Ein DiceResult beinhaltet konkrete Informationen über einen Würfelwurf.

 * @class DiceResult
 */
function DiceResult() {}

/**
 * Liefert die Konfiguration mit der gewürfelt wurde.
 * @return {DiceConfiguration} 
 */
DiceResult.prototype.getDiceConfiguration = function() {};

/**
 * Liefert ein Array mit Details zu den einzelnen Ergebnissen pro Würfeltyp.
 * @return {SingleDiceResult[]} 
 */
DiceResult.prototype.getSingleDiceResults = function() {};

/**
 * Liefert die Summe der Augenzahlen aller  Würfel
 * @return {Number} 
 */
DiceResult.prototype.totalSum = function() {};




/**
 * Jede App besitzt eine AppPersistence in der global für diese App
 * Informationen gespeichert werden können. An die Instanz der AppPersistence gelangt man durch den Aufruf
 * KnuddelsServer.getPersistence();.

 * @class AppPersistence
 * @extends Persistence
 */
function AppPersistence() {}
AppPersistence.prototype = new Persistence;




/**
 * ToplistRankChangeEvents erhalten EventListener die bei einer
 * Toplist mit der Methode Toplist/addRankChangeListener:method
 * erzeugt wurden, nachdem sich der Rang für einen User geändert hat.
 * 
 * Das ToplistRankChangeEvent enthält alle wichtigen Daten, um auf die Änderung zu reagieren
 * und den überholten Usern eine Nachricht zu senden.

 * @class ToplistRankChangeEvent
 */
function ToplistRankChangeEvent() {}

/**
 * Liefert die zugehörige Toplist.
 * @return {Toplist} 
 */
ToplistRankChangeEvent.prototype.getToplist = function() {};

/**
 * Liefert den Toplisten-Rang, den der User vor der Änderung hatte.
 * @return {Number} -1, falls der Nutzer vorher keinen Rang hatte.
 */
ToplistRankChangeEvent.prototype.getOldRank = function() {};

/**
 * Liefert den neuen Toplisten-Rang, des Users.
 * @return {Number} 
 */
ToplistRankChangeEvent.prototype.getNewRank = function() {};

/**
 * Liefert den User für den das Event ausgelöst wurde.
 * @return {User} 
 */
ToplistRankChangeEvent.prototype.getUser = function() {};

/**
 * Liefert die User, die bei dieser Änderung überholt worden sind.
 * Achtung: Wenn mehr als 10 User
 * überholt wurden, so liefert die Methode die besten 10 überholten User.
 * @return {User[]} 
 */
ToplistRankChangeEvent.prototype.getUsersOvertook = function() {};

/**
 * Liefert den Wert, der vor der Änderung gespeichert war.
 * @return {Number} 
 */
ToplistRankChangeEvent.prototype.getOldValue = function() {};

/**
 * Liefert den neuen Wert.
 * @return {Number} 
 */
ToplistRankChangeEvent.prototype.getNewValue = function() {};




/**
 * Eine Instanz der Klasse ChannelJoinPermission wird als Rückgabewert
 * der Methode App.mayJoinChannel(user) benötigt.
 * 
 * Hiermit wird bestimmt, ob der anfragende Nutzer den Channel betreten darf.
 * 
 * Erlauben mit ChannelJoinPermission.accepted()
 * Verbieten mit ChannelJoinPermission.denied(denyReason)

 * @class ChannelJoinPermission
 */
function ChannelJoinPermission() {}

/**
 * Erzeugt ein ChannelJoinPermission-Objekt, das den Zugriff in den Channel erlaubt.
 * @static
 * @return {ChannelJoinPermission} 
 */
ChannelJoinPermission.accepted = function() {};

/**
 * Erzeugt ein ChannelJoinPermission-Objekt, das den Zugriff in den Channel verbietet.
 * @static
 * @param {String} denyReason
 * @return {ChannelJoinPermission} 
 */
ChannelJoinPermission.denied = function(denyReason) {};




/**
 * Eine Instanz von KnuddelAccount ermöglicht den Zugriff auf die freigegebenen Knuddel
 *  eines bestimmten User. Knuddel können abgezogen und addiert werden.

 * @class KnuddelAccount
 */
function KnuddelAccount() {}

/**
 * Liefert den KnuddelAmount eines Users,
 * über den die App gerade frei verfügen kann.
 * @return {KnuddelAmount} 
 */
KnuddelAccount.prototype.getKnuddelAmount = function() {};

/**
 * Liefert den KnuddelAmount aus dem KnuddelAccount,
 * der bereits von der App genutzt wurde.
 * Beim Auszahlen dieser Knuddel aus dem KnuddelAccount an den
 * User fallen Steuern an.
 * @return {KnuddelAmount} 
 */
KnuddelAccount.prototype.getKnuddelAmountUsed = function() {};

/**
 * Liefert den KnuddelAmount aus dem KnuddelAccount,
 * der noch nicht von der App genutzt wurde.
 * Beim Auszahlen dieser Knuddel aus dem KnuddelAccount an den
 * User fallen keine Steuern an.
 * @return {KnuddelAmount} 
 */
KnuddelAccount.prototype.getKnuddelAmountUnused = function() {};

/**
 * Liefert die Summe aller Transfers, die die App an diesen KnuddelAccount bzw. User überwiesen hat.
 * @return {KnuddelAmount} 
 */
KnuddelAccount.prototype.getTotalKnuddelAmountAppToUser = function() {};

/**
 * Liefert die Summe aller Transfers, die die App von diesem KnuddelAccount bzw. User abgebucht/erhalten hat.
 * @return {KnuddelAmount} 
 */
KnuddelAccount.prototype.getTotalKnuddelAmountUserToApp = function() {};

/**
 * Liefert die Information, ob in diesem Moment genug Knuddel verfügbar sind.
 * @param {KnuddelAmount} knuddelAmount
 * @return {Boolean} 
 */
KnuddelAccount.prototype.hasEnough = function(knuddelAmount) {};

/**
 * Liefert den Nutzer, dem der KnuddelAccount gehört.
 * @return {User} 
 */
KnuddelAccount.prototype.getUser = function() {};

/**
 * Versucht eine bestimmte Menge Knuddel zu verwenden. Dies ist nur möglich, wenn der User auf seinem KnuddelAccount
 * genug Knuddel besitzt und online im Channel ist.
 * Vom KnuddelAccount des Besitzer des Channel können Knuddel auch abgebucht werden, wenn dieser nicht im Channel online ist.
 * 
 * Ist das Event App.onBeforeKnuddelReceived implementiert, so wird diese direkt nach dem use aufgerufen,
 * um zu entscheiden, ob die Knuddel angenommen werden sollen.
 * 
 * Hinweis: Knuddel an einen Nutzer senden kannst du mit der Methode BotUser/transferKnuddel:method.
 * @param {KnuddelAmount} knuddelAmount
 * @param {String} displayReasonText
 * @param {Object} [parameters]
 * @return {void} 
 */
KnuddelAccount.prototype.use = function(knuddelAmount, displayReasonText, parameters) {};




/**
 * Wird in der App die Methode onUserDiced überschrieben, so erhält diese bei jedem Würfelwurf ein DiceEvent.
 * Ein DiceEvent ermöglicht einem detaillierte Informationen rund um diesen Würfelwurf in Erfahrung zu bringen.

 * @class DiceEvent
 */
function DiceEvent() {}

/**
 * Liefert den Nutzer, der gewürfelt hat.
 * @return {User} 
 */
DiceEvent.prototype.getUser = function() {};

/**
 * Liefert das DiceResult des Würfelwurfs.
 * @return {DiceResult} 
 */
DiceEvent.prototype.getDiceResult = function() {};




/**
 * RandomOperations bietet eine Sammlung verschiedener Zufallsoperationen, die man für Glücksspiele und Ähnliches nutzen kann.

 * @class RandomOperations
 */
function RandomOperations() {}

/**
 * Liefert eine Zufallszahl zwischen minValue (inklusiv) und maxValue (exklusiv).
 * @static
 * @param {Number} [minValue]
 * @param {Number} maxValue
 * @return {Number} 
 */
RandomOperations.nextInt = function(minValue, maxValue) {};

/**
 * Liefert ein Array mit Zufallszahlen zwischen minValue (inklusiv) und n (exklusiv).
 * @static
 * @param {Number} [minValue]
 * @param {Number} maxValue
 * @param {Number} count
 * @param {Boolean} onlyDifferentNumbers
 * @return {Number[]} 
 */
RandomOperations.nextInts = function(minValue, maxValue, count, onlyDifferentNumbers) {};

/**
 * Liefert true in truePropability/1 Fällen
 * @static
 * @param {Number} truePropability
 * @return {Boolean} 
 */
RandomOperations.flipTrue = function(truePropability) {};

/**
 * Liefert ein zufälliges Objekt aus einem Array.
 * Falls das Array leer ist, wird null zurückgeliefert.
 * @static
 * @param {Object[]} objects
 * @return {Object} 
 */
RandomOperations.getRandomObject = function(objects) {};

/**
 * Mischt das Array der übergebenen Objekte und liefert es zurück.
 * @static
 * @param {Object[]} objects
 * @return {Object[]} 
 */
RandomOperations.shuffleObjects = function(objects) {};

/**
 * Liefert einen zufälligen String zurück.
 * @static
 * @since AppServer 92699
 * @param {Number} length
 * @param {String} [allowedCharacters]
 * @return {String} Zeichenkette mit gewünschter Länge
 */
RandomOperations.getRandomString = function(length, allowedCharacters) {};




