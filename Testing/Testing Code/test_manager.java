package test1;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

public class test_manager extends SeleneseTestCase {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		//selenium = new DefaultSelenium("localhost", 4444, "*firefox", "http://localhost:9000/");
		selenium = new DefaultSelenium("localhost", 4444, "*googlechrome", "http://localhost:9000/");
		selenium.start();
	}

	@Test
	public void testTest_manager() throws Exception {
		selenium.open("/");
		selenium.type("id=name", "test_manager");
		selenium.type("id=password", "test_manager");
		selenium.click("css=button.btn.btn-default");
		selenium.waitForPageToLoad("30000");
		selenium.click("css=a.btn.btn-default");
		selenium.waitForPageToLoad("30000");
		selenium.type("id=dishName", "test_dish1");
		selenium.type("name=dish[price]", "10");
		selenium.type("id=quantity", "20");
		selenium.click("css=button.btn.btn-default");
		selenium.waitForPageToLoad("30000");
		selenium.click("css=a.btn.btn-default");
		selenium.waitForPageToLoad("30000");
		selenium.type("id=dishName", "test_dish2");
		selenium.type("name=dish[price]", "20");
		selenium.type("id=quantity", "100");
		selenium.click("css=button.btn.btn-default");
		selenium.waitForPageToLoad("30000");
		selenium.click("xpath=(//a[contains(text(),'修改菜品库存')])[2]");
		selenium.waitForPageToLoad("30000");
		selenium.click("name=dish-check");
		selenium.type("name=count", "10");
		selenium.click("//button[@type='submit']");
		assertEquals("修改成功", selenium.getAlert());
		selenium.click("name=dish-check");
		selenium.click("xpath=(//input[@name='dish-check'])[2]");
		selenium.type("name=count", "20");
		selenium.type("xpath=(//input[@name='count'])[2]", "20");
		selenium.click("//button[@type='submit']");
		assertEquals("修改成功", selenium.getAlert());
		selenium.click("link=首页");
		selenium.waitForPageToLoad("30000");
		selenium.click("xpath=(//a[contains(text(),'删除菜品')])[2]");
		selenium.waitForPageToLoad("30000");
		selenium.addSelection("id=all-dish-list", "label=test_dish2");
		selenium.click("css=button.btn.btn-default");
		assertEquals("删除成功", selenium.getAlert());
		selenium.addSelection("id=all-dish-list", "label=test_dish1");
		selenium.click("css=button.btn.btn-default");
		assertEquals("删除成功", selenium.getAlert());
		selenium.click("link=首页");
		selenium.waitForPageToLoad("30000");
		selenium.click("link=选项");
		selenium.click("link=添加菜品");
		selenium.waitForPageToLoad("30000");
		selenium.click("link=选项");
		selenium.click("link=删除菜品");
		selenium.waitForPageToLoad("30000");
		selenium.click("link=选项");
		selenium.click("link=修改菜品库存");
		selenium.waitForPageToLoad("30000");
		selenium.click("link=选项");
		selenium.click("link=登出");
		selenium.waitForPageToLoad("30000");
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
