import React from 'react';
import { Image, Text, View, TextInput, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Person from "../assets/components/Person";
import styles from "../assets/css/calculator";

export default class ImageScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalBeforeTax: 0,            //user input total
            currentTotal: null,              //total after plates have been divided
            tax: 0,
            tip: 0,
            tipPercent: 0,
            people: this.props.navigation.state.params.people,
            currentDisplay: 0,
            newItem: null,
            done: false,                    //determines if bill has been split and finalized
            splitOpts: false,
            selectSplit: false
        }
    }

    componentDidMount() {
        console.log("start")
    }

    handleChecked = (id) => {
        console.log(this.state.people[id]);
        console.log(id);
        this.state.people[id].checked = !this.state.people[id].checked
        this.forceUpdate();
        console.log(this.state.people[id]);

    }
    addItem = (index) => {
        console.log("add item")
        if (this.state.newItem && parseFloat(this.state.newItem) <= parseFloat(this.state.currentTotal)) {
            this.state.people[index].items = this.state.people[index].items.concat(this.state.newItem)
            let total = 0;
            this.state.people[index].items.forEach(item => {
                total += parseFloat(item)
            });
            this.state.people[index].total = total;
            let newTotal = this.state.currentTotal - this.state.newItem;
            this.setState({
                // newItem: null,
                currentTotal: newTotal
            })
        }
    }

    deleteItem = (personId, index) => {
        console.log("delete")
        console.log(personId)
        console.log(index)
        let deletedAmount = parseInt(this.state.people[personId].items[index])
        let newTotal = this.state.currentTotal + deletedAmount
        this.state.people[personId].items.splice(index, 1);
        let personTotal = this.state.people[personId].total - deletedAmount
        this.state.people[personId].total = personTotal
        this.setState({ currentTotal: newTotal })
        console.log(this.state.people[personId].items)
    }

    handleItemChange = (input) => {
        this.setState({ newItem: input })
    }

    nextDisplay = () => {
        let display = this.state.currentDisplay;
        if ((display === 0 && this.state.totalBeforeTax > 0) ||
            display === 1 || display === 2) {
            display += 1;
            this.setState({
                currentDisplay: display
            });
        }
    }

    prevDisplay = () => {
        let display = this.state.currentDisplay - 1;
        this.setState({
            currentDisplay: display,
            splitOpts: false,
            selectSplit: false
        });
    }

    setTipAmount = (percentage) => {
        let tip = this.state.totalBeforeTax * percentage / 100.0
        this.setState({ tip })
    }

    splitBill = () => {
        console.log("split bill");
        let splitAmount;
        if (!this.state.selectSplit) {
            splitAmount = this.state.currentTotal / this.state.people.length;
        }
        else {
            let count = 0;
            this.state.people.forEach(item => {
                if (item.checked) {
                    count++;
                }
            })
            splitAmount = this.state.currentTotal / count;
        }

        let remainingAmt = this.state.totalBeforeTax + this.state.tip + this.state.tax;
        console.log(remainingAmt);
        this.state.people.forEach((item, index) => {
            if (!this.state.selectSplit || (this.state.selectSplit && item.checked)) {
                let total = item.total;
                total += splitAmount;
                let taxP = this.state.tax / this.state.totalBeforeTax;
                let tax = taxP * total;
                let tip = this.state.tipPercent / 100 * total;
                total += tax + tip;
                item.total = total;
                item.tax = tax;
                item.tip = tip;
            }
            else if (this.state.selectSplit && !item.checked) {
                let total = item.total;
                let taxP = this.state.tax / this.state.totalBeforeTax;
                let tax = taxP * total;
                let tip = this.state.tipPercent / 100 * total;
                total += tax + tip;
                item.total = total;
                item.tax = tax;
                item.tip = tip;
            }
            remainingAmt -= item.total.toFixed(2);
            if(this.state.people.length - 1 === index && remainingAmt !== 0){
                item.total += remainingAmt;
            }
        });

        this.setState({
            people: this.state.people,
            done: true,
            splitOpts: false,
            selectSplit: false
        })
    }

    reset = () => {
        this.state.people.forEach(item => {
            item.total = 0,
            item.tax = 0,
            item.tip = 0,
            item.items = [],
            item.checked = false
        });

        this.setState({
            totalBeforeTax: 0,
            currentTotal: null,
            tax: 0,
            tip: 0,
            tipPercent: 0,
            people: this.state.people,
            currentDisplay: 0,
            newItem: null,
            done: false,
            splitOpts: false,
            selectSplit: false
        })
    }

    render() {
        let inputDisplay;
        if (this.state.currentDisplay === 0) {
            inputDisplay =
                <View style={styles.container1}>
                    <Text style={styles.textLabel}>Subtotal: </Text>
                    <TextInput
                        onChangeText={(input) => this.setState({ totalBeforeTax: parseFloat(input), currentTotal: input })}
                        style={styles.textInput}
                        placeholder="0.00"
                        placeholderTextColor="white"
                        // value={`${this.state.totalBeforeTax}`}
                        keyboardType='numeric'
                        returnKeyType='done'
                        onSubmitEditing={this.nextDisplay}
                        autoFocus={true}
                    />
                </View>
        }
        else if (this.state.currentDisplay === 1) {
            inputDisplay =
                <View style={styles.container1}>
                    <Text style={styles.textLabel}>Subtotal: ${this.state.totalBeforeTax.toFixed(2)}</Text>
                    <Text style={styles.textLabel}>Tax: </Text>
                    <TextInput
                        onChangeText={(input) => this.setState({ tax: parseFloat(input) })}
                        style={styles.textInput}
                        placeholder="0.00"
                        placeholderTextColor="white"
                        // value={`${this.state.tax}`}
                        keyboardType='numeric'
                        returnKeyType='done'
                        onSubmitEditing={this.nextDisplay}
                        autoFocus={true}
                    />
                </View>
        }
        else if (this.state.currentDisplay === 2) {
            inputDisplay =
                <View style={styles.container1}>
                    <Text style={styles.textLabel}>Subtotal: ${this.state.totalBeforeTax.toFixed(2)}</Text>
                    <Text style={styles.textLabel}>Tax: ${this.state.tax.toFixed(2)}</Text>
                    <Text style={styles.textLabel}>Tip: </Text>
                    <TextInput
                        onChangeText={(input) => { this.setState({ tipPercent: parseFloat(input) }); this.setTipAmount(input) }}
                        style={styles.textInput}
                        placeholder="%"
                        placeholderTextColor='#ffffff'
                        // value={`${this.state.tipPercent}`}
                        keyboardType='numeric'
                        returnKeyType='done'
                        onSubmitEditing={this.nextDisplay}
                        autoFocus={true}
                    />
                </View>
        }
        else if (this.state.currentDisplay === 3) {
            inputDisplay =
                <View style={styles.container1}>
                    <Text style={styles.textLabel}>Subtotal: ${this.state.totalBeforeTax.toFixed(2)}</Text>
                    <Text style={styles.textLabel}>Tax: ${this.state.tax.toFixed(2)}</Text>
                    <Text style={styles.textLabel}>Tip: ${this.state.tip.toFixed(2)}</Text>

                </View>
        }

        let nextBtn;
        if (this.state.currentDisplay < 3) {
            nextBtn =
                <Icon
                    name="arrow-right-thick"
                    type="material-community"
                    iconStyle={styles.iconStyle}
                    containerStyle={styles.iconCointainer}
                    onPress={this.nextDisplay}
                />    
        }
        let prevBtn;
        if (this.state.currentDisplay > 0 && !this.state.done) {
            prevBtn =
                <Icon
                name="arrow-left-thick"
                type="material-community"
                iconStyle={styles.iconStyle}
                containerStyle={styles.iconCointainer}
                onPress={this.prevDisplay}
                /> 
        }

        let splitBtn;
        if (!this.state.done && this.state.currentDisplay === 3 && this.state.currentTotal !== 0) {
            if (!this.state.splitOpts) {
                splitBtn =
                    <View>
                        <Text style={styles.textLabel}>Remaining Amount: ${parseFloat(this.state.currentTotal).toFixed(2)}</Text>
                        <Button
                            title="Split"
                            onPress={() => this.setState({ splitOpts: true })}
                            buttonStyle={styles.button}
                            titleStyle={styles.buttonTitle}
                        />
                    </View>
            }
            else if (this.state.selectSplit) {
                splitBtn =
                    <View>
                        <Text style={styles.textLabel2}>Remaining Amount: ${parseFloat(this.state.currentTotal).toFixed(2)}</Text>
                        <Button
                            title="Split"
                            onPress={this.splitBill}
                            buttonStyle={styles.button}
                            titleStyle={styles.buttonTitle}
                        />
                    </View>
            }
            else {
                splitBtn =
                    <View style={styles.inputContainer}>
                        <Text style={styles.textLabel2}>Remaining Amount: ${parseFloat(this.state.currentTotal).toFixed(2)}</Text>
                        <View style={styles.btnContainer}>
                            <Button
                                title="With Everyone"
                                onPress={this.splitBill}
                                buttonStyle={styles.button}
                                titleStyle={styles.buttonTitle}
                            />
                            <Button
                                title="Select People"
                                onPress={() => this.setState({ selectSplit: true })}
                                buttonStyle={styles.button}
                                titleStyle={styles.buttonTitle}
                            />
                        </View>
                    </View>
            }
        }

        let peopleDsp;
        let resetBtn;
        if (this.state.currentDisplay === 3) {
            peopleDsp =
                <ScrollView >
                    {this.state.people.map((element, index) => {
                        return <Person
                            key={index}
                            id={index}
                            people={element}
                            currentTotal={this.state.currentTotal}
                            //newItem = {this.state.newItem}
                            handleItemChange={this.handleItemChange}
                            addItem={() => this.addItem(index)}
                            deleteItem={(personId, index) => this.deleteItem(personId, index)}
                            checked={this.state.checked}
                            handleChecked={(id) => this.handleChecked(id)}
                            selectSplit={this.state.selectSplit}
                        />
                    })}
                

            {resetBtn =
                <Button
                    title="Reset"
                    onPress={this.reset}
                    buttonStyle={styles.resetBtn}
                    titleStyle={styles.buttonTitle}
                />}
                </ScrollView>
        }

        let getTotal;
        if (!this.state.done && this.state.currentTotal === 0) {
            getTotal =
                <Button
                    title="Calculate Totals"
                    onPress={this.splitBill}
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonTitle}
                />
        }

        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: "#6b7a8f" }}>
                    <View style={styles.inputContainer}>
                        {inputDisplay}
                    </View>
                    <View style={styles.btnContainer}>
                        {prevBtn}
                        {nextBtn}
                    </View>
                    <View style={styles.splitContainer}>
                        {splitBtn}
                        {getTotal}
                    </View>
                </ScrollView>
                <View style={{ flex: 2, backgroundColor: "#dcc7aa", paddingHorizontal: 10 }}>
                    <View style={styles.peopleContainer}>
                        {peopleDsp}
                    </View>
                </View>
            </View>
        );
    }
}